// TODO: uncomment this file when we have a contract to interact with

// import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
// import { WriteContractResult } from 'wagmi/actions';
import { TransactionExecutionError } from 'viem';

import { useStateContext } from './useStateContext';
import { getViewTransaction } from '~/utils';
// import { xKeeperMetadataABI } from '~/generated';
import { ModalType } from '~/types';

interface SendTransactionProps {
  contractAddress?: string;
  functionName: 'setAutomationVaultMetadata';
  args: string;
  notificationTitle?: string;
  notificationMessage?: string | JSX.Element;
  showReceipt?: boolean;
}

export const useXKeeperMetadata = ({
  contractAddress,
  // functionName,
  // args,
  notificationTitle,
  notificationMessage,
  showReceipt,
}: SendTransactionProps): {
  handleSendTransaction: () => Promise<void>;
  writeAsync: (() => void) | undefined;
  // writeAsync: (() => Promise<WriteContractResult>) | undefined;
} => {
  const { currentNetwork, setLoading, setModalOpen, setNotification } = useStateContext();
  // const publicClient = usePublicClient();

  // const { config } = usePrepareContractWrite({
  //   address: contractAddress as Address,
  //   abi: xKeeperMetadataABI,
  //   functionName: functionName,
  //   args: args,
  // });

  // const { writeAsync } = useContractWrite(config);
  const writeAsync = () => console.log('calling writeAsync');

  const handleSendTransaction = async () => {
    setLoading(true);
    console.log('hey');
    try {
      if (contractAddress) {
        // if (writeAsync) {
        // const writeResult = await writeAsync();
        // await publicClient.waitForTransactionReceipt(writeResult);
        setModalOpen(ModalType.NONE);

        setNotification({
          open: true,
          title: notificationTitle,
          message: showReceipt ? getViewTransaction(/* writeResult.hash */ '0x', currentNetwork) : notificationMessage,
        });
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
    }
    setLoading(false);
  };

  return {
    handleSendTransaction,
    writeAsync,
  };
};
