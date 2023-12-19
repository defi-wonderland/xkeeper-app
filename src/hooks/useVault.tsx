import { useState } from 'react';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';
import { TransactionExecutionError } from 'viem';

import { useCustomClient, useModal, useStateContext } from '~/hooks';
import { getViewTransaction } from '~/utils';
import { vaultABI } from '~/generated';
import { ModalType, Status } from '~/types';

interface SendTransactionProps {
  contractAddress?: string;
  functionName:
    | 'acceptOwner'
    | 'approveJobSelectors'
    | 'approveRelayCallers'
    | 'changeOwner'
    | 'exec'
    | 'revokeJobSelectors'
    | 'revokeRelayCallers'
    | 'withdrawFunds'
    | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any;

  notificationTitle?: string;
  notificationMessage?: string | JSX.Element;
  showReceipt?: boolean;
}

export const useVault = ({
  contractAddress,
  functionName,
  args,
  notificationTitle,
  notificationMessage,
  showReceipt,
}: SendTransactionProps): {
  requestStatus: Status;
  handleSendTransaction: () => Promise<void>;
  writeAsync: (() => Promise<WriteContractResult>) | undefined;
} => {
  const { currentNetwork, setNotification } = useStateContext();
  const { setModalOpen } = useModal();
  const { publicClient } = useCustomClient();
  const [requestStatus, setRequestStatus] = useState(Status.IDLE);

  const { config } = usePrepareContractWrite({
    address: contractAddress as Address,
    abi: vaultABI,
    functionName: functionName,
    args: args,
  });

  const { writeAsync } = useContractWrite(config);

  const handleSendTransaction = async () => {
    setRequestStatus(Status.LOADING);
    try {
      if (writeAsync) {
        const writeResult = await writeAsync();
        await publicClient.waitForTransactionReceipt(writeResult);
        setModalOpen(ModalType.NONE);

        setNotification({
          open: true,
          title: notificationTitle,
          message: showReceipt ? getViewTransaction(writeResult.hash, currentNetwork) : notificationMessage,
        });
      }
      setRequestStatus(Status.SUCCESS);
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
