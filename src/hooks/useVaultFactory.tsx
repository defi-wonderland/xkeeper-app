import { useState, useMemo } from 'react';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';
import { useNavigate } from 'react-router-dom';
import { TransactionExecutionError } from 'viem';

import { useStateContext, useCustomClient } from '~/hooks';
import { vaultFactoryABI } from '~/generated';
import { getTotalVaults, getViewTransaction, getSalt } from '~/utils';
import { getConfig } from '~/config';
import { Status } from '~/types';

interface SendTransactionProps {
  ownerAddress: Address;
  selectedChain: string;
}

export const useVaultFactory = ({
  ownerAddress,
  selectedChain,
}: SendTransactionProps): {
  requestStatus: Status;
  handleSendTransaction: () => Promise<void>;
  writeAsync: (() => Promise<WriteContractResult>) | undefined;
} => {
  const { setNotification, currentNetwork, setSelectedVault } = useStateContext();
  const [requestStatus, setRequestStatus] = useState(Status.IDLE);
  const { addresses, DEFAULT_ETH_ADDRESS } = getConfig();
  const { publicClient } = useCustomClient(currentNetwork?.id);
  const navigate = useNavigate();

  const args = useMemo(
    () => [ownerAddress, DEFAULT_ETH_ADDRESS as Address, getSalt()] as [Address, Address, bigint],
    [DEFAULT_ETH_ADDRESS, ownerAddress],
  );

  const { config } = usePrepareContractWrite({
    address: addresses.AutomationVaultFactory,
    abi: vaultFactoryABI,
    functionName: 'deployAutomationVault',
    args: args,
    chainId: Number(selectedChain),
  });

  const { writeAsync } = useContractWrite(config);

  const handleSendTransaction = async () => {
    setRequestStatus(Status.LOADING);
    try {
      if (writeAsync) {
        const writeResult = await writeAsync();
        await publicClient.waitForTransactionReceipt(writeResult);
        const totalRequestCount = await getTotalVaults(publicClient, addresses.AutomationVaultFactory);

        // Fetch the newly created vault
        const result = await publicClient.readContract({
          address: addresses.AutomationVaultFactory,
          abi: vaultFactoryABI,
          functionName: 'automationVaults',
          args: [BigInt(totalRequestCount - 1), 1n],
        });

        // reset selected vault
        setSelectedVault();

        // Redirects to the newly created vault
        if (result && result.length) navigate('/vault/' + result[result.length - 1]);

        setNotification({
          open: true,
          title: 'Vault successfully created',
          message: getViewTransaction(writeResult.hash, currentNetwork),
        });

        setRequestStatus(Status.SUCCESS);
      }
    } catch (error) {
      console.error(error);
      const e = error as TransactionExecutionError;
      setNotification({
        open: true,
        error: true,
        title: e.name,
        message: e.shortMessage,
      });

      setRequestStatus(Status.ERROR);
    }
  };

  return {
    requestStatus,
    handleSendTransaction,
    writeAsync,
  };
};
