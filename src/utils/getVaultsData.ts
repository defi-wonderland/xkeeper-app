import { Address } from 'viem';
import { PublicClient, erc20ABI } from 'wagmi';

import { vaultABI, vaultFactoryABI } from '~/generated';
import { CallResult, JobData, PriceData, RelayData, Token, TokenData, VaultData } from '~/types';
import { formatTokensData, getTotalUsdBalance, truncateFunctionSignature } from '~/utils';

export const getVaults = async (publicClient: PublicClient, vaultFactoryAddress: Address): Promise<Address[]> => {
  try {
    const data = await publicClient.readContract({
      address: vaultFactoryAddress,
      abi: vaultFactoryABI,
      functionName: 'automationVaults',
    });

    return [...data].reverse();
  } catch (error) {
    console.error('Error getting vaults', error);
    return [];
  }
};

export const getVaultsData = async (
  publicClient: PublicClient,
  vaults: Address[],
  tokenList: Token[],
  prices: PriceData,
  xKeeperMetadata: Address,
): Promise<VaultData[]> => {
  const vaultsData: VaultData[] = [];

  try {
    for (const vault of vaults) {
      const { owner, name, relays, jobs, tokens, description } = await fetchAndFormatData(
        publicClient,
        vault,
        tokenList,
        prices,
        xKeeperMetadata,
      );

      vaultsData.push({
        address: vault,
        chain: publicClient.chain.name.toLocaleLowerCase(),
        name: name,
        owner: owner,
        jobs: jobs,
        relays: relays,
        tokens: tokens,
        totalValue: getTotalUsdBalance(tokens),
        description,
      });
    }

    return vaultsData;
  } catch (error) {
    console.error('Error getting vaults data', error);
    return vaultsData;
  }
};

const fetchAndFormatData = async (
  publicClient: PublicClient,
  vaultAddress: Address,
  tokens: Token[],
  prices: PriceData,
  xKeeperMetadata: Address,
): Promise<{
  owner: Address | undefined;
  name: string | undefined;
  relays: RelayData;
  jobs: JobData;
  tokens: TokenData[];
  description: string;
}> => {
  const vaultContract = { address: vaultAddress, abi: vaultABI };

  // TODO
  // const metadataContract = { address: xKeeperMetadata, abi: xKeeperMetadataABI };
  console.log(xKeeperMetadata);

  let relaysData: RelayData = {};
  let jobData: JobData = {};
  let tokensData: TokenData[] = [];

  const balanceCalls = tokens.map((token) => ({
    address: token.address as Address,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [vaultAddress],
  }));

  const ethBalance = await publicClient.getBalance({ address: vaultAddress });

  const multicallResult = await publicClient.multicall({
    contracts: [
      { ...vaultContract, functionName: 'owner' },
      { ...vaultContract, functionName: 'organizationName' },
      { ...vaultContract, functionName: 'relays' },
      { ...vaultContract, functionName: 'jobs' },
      // { ...metadataContract, functionName: 'automationVaultMetadata' },
      ...balanceCalls,
    ],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [owner, name, relays, jobs] = multicallResult.slice(0, 4) as any; // TODO: update to 5 when metadata is added
  const tokensResult = multicallResult.slice(4) as CallResult[]; // TODO: update to 5 when metadata is added

  if (relays?.result && jobs?.result) {
    const relayEnabledCallers = relays.result.map((relayAddress: Address) => ({
      ...vaultContract,
      functionName: 'relayEnabledCallers',
      args: [relayAddress],
    }));

    const jobEnabledFunctions = jobs.result.map((jobAddress: Address) => ({
      ...vaultContract,
      functionName: 'jobEnabledFunctions',
      args: [jobAddress],
    }));

    const currentChain = publicClient.chain.name.toLocaleLowerCase();
    const chainName = currentChain === 'goerli' ? 'ethereum' : currentChain; // Load tokens from mainnet when on goerli

    const [callers, jobFunctions] = await Promise.all([
      publicClient.multicall({ contracts: relayEnabledCallers }),
      publicClient.multicall({ contracts: jobEnabledFunctions }),
    ]);

    // format RelayData
    relaysData = Object.fromEntries(callers.map((caller, index) => [relays.result[index], caller.result as Address[]]));

    // format JobData
    jobData = Object.fromEntries(
      jobFunctions.map((func, index) => [jobs.result[index], (func.result as string[]).map(truncateFunctionSignature)]),
    );

    tokensData = formatTokensData(tokens, tokensResult, ethBalance, chainName, prices);
  }

  // temporary
  const generateRandonDescription = () => {
    const random = Math.floor(Math.random() * 10);
    return random % 2 === 0
      ? ''
      : 'Lorem ipsum dolor sit amet consectetur. Euismod blandit dictum lacus penatibus. In morbi et ut amet consectetur arcu. Dui in netus eget nulla lorem nibh erat felis.';
  };

  return {
    owner: owner?.result,
    relays: relaysData,
    jobs: jobData,
    tokens: tokensData,

    // temporary
    // these values will fetched from XKeeperMetadata contract in the future
    name: name?.result,
    description: generateRandonDescription(),
  };
};
