import { Address } from 'viem';

import { vaultABI, vaultFactoryABI } from '~/generated';
import { publicClient } from '~/config';
import { VaultData } from '~/types';

export const getVaults = async (vaultFactoryAddress: Address): Promise<Address[]> => {
  try {
    const data = await publicClient.readContract({
      address: vaultFactoryAddress,
      abi: vaultFactoryABI,
      functionName: 'automationVaults',
    });

    return data as Address[];
  } catch (error) {
    console.log('Error getting vaults', error);
    return [];
  }
};

export const getVaultsData = async (vaults: Address[]): Promise<VaultData[]> => {
  const vaultsData: VaultData[] = [];

  try {
    for (const vault of vaults) {
      const { owner, name, relays, jobs } = await getData(vault);

      vaultsData.push({
        // temporary fixed values
        address: vault,
        balance: '$1,000,000',
        chain: 'ethereum',
        name: name,
        owner: owner,
        jobs: jobs,
        relays: [...relays, '0x74e1b9f9b1df2fde9e05ba03e62c0074f383cabb'],
      });
    }

    return vaultsData;
  } catch (error) {
    console.log('Error getting vaults data', error);
    return vaultsData;
  }
};

const getData = async (
  vaultAddress: Address,
): Promise<{
  owner: Address | undefined;
  name: string | undefined;
  relays: readonly Address[];
  jobs: readonly Address[];
}> => {
  const vaultContract = {
    address: vaultAddress,
    abi: vaultABI,
  } as const;

  const [owner, name, relays, jobs] = await publicClient.multicall({
    contracts: [
      {
        ...vaultContract,
        functionName: 'owner',
      },
      {
        ...vaultContract,
        functionName: 'organizationName',
      },
      {
        ...vaultContract,
        functionName: 'relays',
      },
      {
        ...vaultContract,
        functionName: 'jobs',
      },
    ],
  });

  return {
    owner: owner.result,
    name: name.result,
    relays: relays.result || [],
    jobs: jobs.result || [],
  };
};
