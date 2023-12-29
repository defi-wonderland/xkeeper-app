import { Address } from 'viem';
import { PublicClient } from 'wagmi';

import { vaultFactoryABI } from '~/generated';

export const getTotalVaults = async (publicClient: PublicClient, vaultFactoryAddress: Address): Promise<number> => {
  try {
    const data = await publicClient.readContract({
      address: vaultFactoryAddress,
      abi: vaultFactoryABI,
      functionName: 'totalAutomationVaults',
    });

    return Number(data);
  } catch (error) {
    console.error('Error getting vaults', error);
    return 0;
  }
};
