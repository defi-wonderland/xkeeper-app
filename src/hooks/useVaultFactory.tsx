import { useState } from 'react';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';
import { useNavigate } from 'react-router-dom';
import { TransactionExecutionError } from 'viem';

import { useStateContext } from './useStateContext';
import { useCustomClient } from './useCustomClient';
import { vaultFactoryABI } from '~/generated';
import { getTotalVaults, getViewTransaction } from '~/utils';
import { getConfig } from '~/config';
import { Status } from '~/types';

interface SendTransactionProps {
  args: [Address];
  selectedChain: string;
}

export const useVaultFactory = ({
  args,
  selectedChain,
}: SendTransactionProps): {
  requestStatus: Status;
  handleSendTransaction: () => Promise<void>;
  writeAsync: (() => Promise<WriteContractResult>) | undefined;
} => {
  const { setNotification, currentNetwork } = useStateContext();
  const [requestStatus, setRequestStatus] = useState(Status.IDLE);
  const { addresses } = getConfig();
  const { publicClient } = useCustomClient();
  const navigate = useNavigate();

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
