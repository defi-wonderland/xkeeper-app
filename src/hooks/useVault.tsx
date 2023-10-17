import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';

import { useStateContext } from './useStateContext';
import { ALIAS_KEY, getViewTransaction, saveLocalStorage } from '~/utils';
import { vaultABI } from '~/generated';
import { AliasData, ModalType } from '~/types';

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
  showReceipt?: boolean;
  newAliasData?: AliasData;
}

export const useVault = ({
  contractAddress,
  functionName,
  args,
  notificationTitle,
  notificationMessage,
  showReceipt,
  newAliasData,
}: SendTransactionProps): {
  handleSendTransaction: () => Promise<void>;
  writeAsync: (() => Promise<WriteContractResult>) | undefined;
} => {
  const { currentNetwork, aliasData, updateAliasData, setLoading, setModalOpen, setNotification } = useStateContext();
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

        // Update alias
        if (newAliasData) {
          const temp = { ...aliasData, ...newAliasData };
          saveLocalStorage(ALIAS_KEY, temp);
          updateAliasData();
        }

        setNotification({
          open: true,
          title: notificationTitle,
          message: showReceipt ? getViewTransaction(writeResult.hash, currentNetwork) : notificationMessage,
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
