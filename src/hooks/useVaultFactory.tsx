import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
import { WriteContractResult } from 'wagmi/actions';
import { useNavigate } from 'react-router-dom';

import { useStateContext } from './useStateContext';
import { vaultFactoryABI } from '~/generated';
import { getViewTransaction } from '~/utils';

interface SendTransactionProps {
  args: [Address, string];
}

export const useVaultFactory = ({
  args,
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
    }
    setLoading(false);
  };

  return {
    handleSendTransaction,
    writeAsync,
  };
};
