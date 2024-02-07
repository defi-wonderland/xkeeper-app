import { useState } from 'react';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';
import { TransactionExecutionError } from 'viem';

import { useStateContext, useCustomClient, useModal } from '~/hooks';
import { getViewTransaction } from '~/utils';
import { xkeeperMetadataABI } from '~/generated';
import { ModalType, Status } from '~/types';

interface SendTransactionProps {
  contractAddress?: string;
  args: [Address, { name: string; description: string }];
  notificationTitle?: string;
  notificationMessage?: string | JSX.Element;
  showReceipt?: boolean;
}

export const useXKeeperMetadata = ({
  contractAddress,
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
  const { publicClient } = useCustomClient(currentNetwork?.id);
  const [requestStatus, setRequestStatus] = useState(Status.IDLE);

  const { config } = usePrepareContractWrite({
    address: contractAddress as Address,
    abi: xkeeperMetadataABI,
    functionName: 'setAutomationVaultMetadata',
    args: args,
    chainId: currentNetwork.id,
  });

  const { writeAsync } = useContractWrite(config);

  const handleSendTransaction = async () => {
    setRequestStatus(Status.LOADING);
    try {
      if (contractAddress) {
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
    }
    setRequestStatus(Status.ERROR);
  };

  return {
    requestStatus,
    handleSendTransaction,
    writeAsync,
  };
};
