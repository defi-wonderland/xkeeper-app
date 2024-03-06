import { Address } from 'viem';
import { PublicClient, erc20ABI } from 'wagmi';
import { getConfig } from '~/config';

import { vaultABI, vaultFactoryABI, xkeeperMetadataABI } from '~/generated';
import { CallResult, PriceData, RelayData, RelayResult, Token, TokenData, VaultData } from '~/types';
import { formatTokensData, getChainName, getTotalUsdBalance } from '~/utils';

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
      const { owner, name, relays, nativeToken, tokens, description } = await fetchAndFormatData(
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
        nativeToken,
        owner: owner,
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
  nativeToken: Address;
  relays: RelayData;
  tokens: TokenData[];
  description: string;
}> => {
  const { availableChains } = getConfig();
  const vaultContract = { address: vaultAddress, abi: vaultABI };

  const metadataContract = { address: xKeeperMetadata, abi: xkeeperMetadataABI, args: [vaultAddress] };

  let relaysData: RelayData = {};
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
      { ...vaultContract, functionName: 'NATIVE_TOKEN' },
      { ...metadataContract, functionName: 'automationVaultMetadata' },

      ...balanceCalls,
    ],
  });

  const [multicallResult, ethBalance] = await Promise.all([
    multicallPromise,
    publicClient.getBalance({ address: vaultAddress }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [owner, relays, nativeToken, metadata] = multicallResult.slice(0, 4) as any;
  const [name, description] = metadata?.result || [];

  const tokensResult = multicallResult.slice(4) as CallResult[];

  const chainName = getChainName(publicClient, availableChains);
  const chainId = publicClient.chain.id;
  tokensData = formatTokensData(tokens, tokensResult, ethBalance, chainName, chainId, prices);

  if (relays?.result?.length) {
    const relayEnabledCallers = relays.result.map((relayAddress: Address) => ({
      ...vaultContract,
      functionName: 'getRelayData',
      args: [relayAddress],
    }));

    const [callers] = (await Promise.all([publicClient.multicall({ contracts: relayEnabledCallers })])) as [
      RelayResult,
    ];

    relaysData = Object.fromEntries(
      callers.map((relayData, index) => [
        relays.result[index],
        {
          callers: relayData.result?.[0],
          jobsData: relayData.result?.[1],
        },
      ]),
    );
  }

  return {
    owner: owner?.result,
    relays: relaysData,
    tokens: tokensData,
    nativeToken: nativeToken?.result,
    name: name,
    description: description,
  };
};
