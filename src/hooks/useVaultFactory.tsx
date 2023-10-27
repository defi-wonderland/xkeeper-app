import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';
import { useNavigate } from 'react-router-dom';
import { TransactionExecutionError } from 'viem';

import { useStateContext } from './useStateContext';
import { vaultFactoryABI } from '~/generated';
import { getViewTransaction } from '~/utils';

interface SendTransactionProps {
  args: [Address, string];
  selectedChain: string;
}

export const useVaultFactory = ({
  args,
  selectedChain,
}: SendTransactionProps): {
  handleSendTransaction: () => Promise<void>;
  writeAsync: (() => Promise<WriteContractResult>) | undefined;
} => {
  const { setLoading, setNotification, addresses, currentNetwork } = useStateContext();
  const publicClient = usePublicClient();
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
    setLoading(true);
    try {
      if (writeAsync) {
        const writeResult = await writeAsync();
        await publicClient.waitForTransactionReceipt(writeResult);
        navigate('/');
        setNotification({
          open: true,
          title: 'Vault successfully created',
          message: getViewTransaction(writeResult.hash, currentNetwork),
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
