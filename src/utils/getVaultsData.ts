import { Address } from 'viem';
import { PublicClient, erc20ABI } from 'wagmi';

import { vaultABI, vaultFactoryABI, xkeeperMetadataABI } from '~/generated';
import { CallResult, JobData, PriceData, RelayData, Token, TokenData, VaultData } from '~/types';
import { formatTokensData, getChainName, getTotalUsdBalance, truncateFunctionSignature } from '~/utils';

export const getVaults = async (
  publicClient: PublicClient,
  vaultFactoryAddress: Address,
  startIndex: number,
  endIndex: number,
): Promise<Address[]> => {
  try {
    const data = await publicClient.readContract({
      address: vaultFactoryAddress,
      abi: vaultFactoryABI,
      functionName: 'automationVaults',
      args: [BigInt(startIndex), BigInt(endIndex)],
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

  const metadataContract = { address: xKeeperMetadata, abi: xkeeperMetadataABI, args: [vaultAddress] };

  let relaysData: RelayData = {};
  let jobData: JobData = {};
  let tokensData: TokenData[] = [];

  const balanceCalls = tokens.map((token) => ({
    address: token.address as Address,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [vaultAddress],
  }));

  const multicallPromise = publicClient.multicall({
    contracts: [
      { ...vaultContract, functionName: 'owner' },
      { ...vaultContract, functionName: 'relays' },
      { ...vaultContract, functionName: 'jobs' },
      { ...metadataContract, functionName: 'automationVaultMetadata' },
      ...balanceCalls,
    ],
  });

  const [multicallResult, ethBalance] = await Promise.all([
    multicallPromise,
    publicClient.getBalance({ address: vaultAddress }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [owner, relays, jobs, metadata] = multicallResult.slice(0, 4) as any;
  const [name, description] = metadata?.result || [];

  const tokensResult = multicallResult.slice(4) as CallResult[];

  const chainName = getChainName(publicClient);
  tokensData = formatTokensData(tokens, tokensResult, ethBalance, chainName, prices);

  if (relays?.result?.length || jobs?.result?.length) {
    const relayEnabledCallers = relays.result.map((relayAddress: Address) => ({
      ...vaultContract,
      functionName: 'relayEnabledCallers',
      args: [relayAddress],
    }));

    const jobEnabledFunctions = jobs.result.map((jobAddress: Address) => ({
      ...vaultContract,
      functionName: 'jobEnabledSelectors',
      args: [jobAddress],
    }));

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
  }

  return {
    owner: owner?.result,
    relays: relaysData,
    jobs: jobData,
    tokens: tokensData,
    name: name,
    description: description,
  };
};
