import { Address } from 'viem';

import { vaultABI, vaultFactoryABI } from '~/generated';
import { JobData, RelayData, VaultData } from '~/types';
import { truncateFunctionSignature } from '~/utils';
import { publicClient } from '~/config';

export const getVaults = async (vaultFactoryAddress: Address): Promise<Address[]> => {
  try {
    const data = await publicClient.readContract({
      address: vaultFactoryAddress,
      abi: vaultFactoryABI,
      functionName: 'automationVaults',
    });

    return data as Address[];
  } catch (error) {
    console.error('Error getting vaults', error);
    return [];
  }
};

export const getVaultsData = async (vaults: Address[]): Promise<VaultData[]> => {
  const vaultsData: VaultData[] = [];

  try {
    for (const vault of vaults) {
      const { owner, name, relays, jobs } = await getData(vault);

      vaultsData.push({
        address: vault,
        balance: '$1,000,000',
        chain: 'ethereum',
        name: name,
        owner: owner,
        jobs: jobs,
        relays: relays,
      });
    }

    return vaultsData;
  } catch (error) {
    console.error('Error getting vaults data', error);
    return vaultsData;
  }
};
const getData = async (
  vaultAddress: Address,
): Promise<{
  owner: Address | undefined;
  name: string | undefined;
  relays: RelayData;
  jobs: JobData;
}> => {
  const vaultContract = { address: vaultAddress, abi: vaultABI } as const;
  let relaysData: RelayData = {};
  let jobData: JobData = {};

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

    const [callers, jobFunctions] = await Promise.all([
      publicClient.multicall({ contracts: relayEnabledCallers }),
      publicClient.multicall({ contracts: jobEnabledFunctions }),
    ]);

    relaysData = Object.fromEntries(callers.map((caller, index) => [relays.result[index], caller.result as Address[]]));

    jobData = Object.fromEntries(
      jobFunctions.map((func, index) => [jobs.result[index], (func.result as string[]).map(truncateFunctionSignature)]),
    );
  }

  return {
    owner: owner?.result,
    name: name?.result,
    relays: relaysData,
    jobs: jobData,
  };
};
