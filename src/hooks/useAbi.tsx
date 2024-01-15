import { useCallback, useState } from 'react';
import { isAddress } from 'viem';

import { getContractAbi, loadLocalStorage, saveLocalStorage } from '~/utils';
import { useStateContext } from './useContext';

export const useAbi = () => {
  const [abi, setAbiData] = useState<{ [key: string]: string }>({});
  const { currentNetwork } = useStateContext();

  const aliasKey = 'xkeeper-abis';

  const getAbi = useCallback(
    async (contractAddress: string) => {
      console.log('getAbi', contractAddress);
      const data = loadLocalStorage(aliasKey);

      if (data[contractAddress]) return data[contractAddress];

      if (!isAddress(contractAddress)) return '';

      const fetchedAbi = await getContractAbi(currentNetwork.name, currentNetwork.apiUrl, contractAddress);
      const newAbiData = { ...data, [contractAddress]: fetchedAbi || '' };
      saveLocalStorage(aliasKey, newAbiData);
      setAbiData(newAbiData);
      return fetchedAbi || '';
    },
    [currentNetwork.apiUrl, currentNetwork.name],
  );

  return {
    getAbi,
    abi,
  };
};
