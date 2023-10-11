import { Address } from 'viem';
import { PublicClient } from 'wagmi';

import { vaultABI, vaultFactoryABI } from '~/generated';
import { JobData, RelayData, Token, TokenData, VaultData } from '~/types';
import { getTokensData, getTotalUsdBalance, truncateFunctionSignature } from '~/utils';

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
): Promise<VaultData[]> => {
  const vaultsData: VaultData[] = [];

  try {
    for (const vault of vaults) {
      const { owner, name, relays, jobs, tokens } = await fetchAndFormatData(publicClient, vault, tokenList);

      vaultsData.push({
        address: vault,
        chain: 'ethereum',
        name: name,
        owner: owner,
        jobs: jobs,
        relays: relays,
        tokens: tokens,
        totalValue: getTotalUsdBalance(tokens),
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
): Promise<{
  owner: Address | undefined;
  name: string | undefined;
  relays: RelayData;
  jobs: JobData;
  tokens: TokenData[];
}> => {
  const vaultContract = { address: vaultAddress, abi: vaultABI };
  let relaysData: RelayData = {};
  let jobData: JobData = {};
  let tokensData: TokenData[] = [];

  const [owner, name, relays, jobs] = await publicClient.multicall({
    contracts: [
      { ...vaultContract, functionName: 'owner' },
      { ...vaultContract, functionName: 'organizationName' },
      { ...vaultContract, functionName: 'relays' },
      { ...vaultContract, functionName: 'jobs' },
    ],
  });

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

    const [callers, jobFunctions, tokensResult] = await Promise.all([
      publicClient.multicall({ contracts: relayEnabledCallers }),
      publicClient.multicall({ contracts: jobEnabledFunctions }),
      getTokensData(tokens, vaultAddress),
    ]);

    relaysData = Object.fromEntries(callers.map((caller, index) => [relays.result[index], caller.result as Address[]]));

    jobData = Object.fromEntries(
      jobFunctions.map((func, index) => [jobs.result[index], (func.result as string[]).map(truncateFunctionSignature)]),
    );

    tokensData = tokensResult;
  }

  return {
    owner: owner?.result,
    name: name?.result,
    relays: relaysData,
    jobs: jobData,
    tokens: tokensData,
  };
};
