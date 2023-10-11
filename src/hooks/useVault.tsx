import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';

import { useStateContext } from './useStateContext';
import { vaultABI } from '~/generated';
import { ModalType } from '~/types';

interface SendTransactionProps {
  contractAddress?: string;
  functionName:
    | 'acceptOwner'
    | 'approveJobFunctions'
    | 'approveRelayCallers'
    | 'changeOwner'
    | 'exec'
    | 'revokeJobFunctions'
    | 'revokeRelayCallers'
    | 'withdrawFunds'
    | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any;

  notificationTitle?: string;
  notificationMessage?: string | JSX.Element;
}

export const useVault = ({
  contractAddress,
  functionName,
  args,
  notificationTitle,
  notificationMessage,
}: SendTransactionProps): {
  handleSendTransaction: () => Promise<void>;
  writeAsync: (() => Promise<WriteContractResult>) | undefined;
} => {
  const { setLoading, setModalOpen, setNotification } = useStateContext();
  const publicClient = usePublicClient();

  const { config } = usePrepareContractWrite({
    address: contractAddress as Address,
    abi: vaultABI,
    functionName: functionName,
    args: args,
  });

  const { writeAsync } = useContractWrite(config);

  const handleSendTransaction = async () => {
    setLoading(true);
    try {
      if (writeAsync) {
        const writeResult = await writeAsync();
        await publicClient.waitForTransactionReceipt(writeResult);
        setModalOpen(ModalType.NONE);
        setNotification({
          open: true,
          title: notificationTitle,
          message: notificationMessage,
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return {
    handleSendTransaction,
    writeAsync,
  };
};
