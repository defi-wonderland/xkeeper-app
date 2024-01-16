import { useCallback, useEffect, useState } from 'react';
import { isAddress } from 'viem';

import { getContractAbi, loadLocalStorage, saveLocalStorage } from '~/utils';
import { useStateContext } from './useContext';
import { getConfig } from '~/config';

export const useAbi = () => {
  const [abi, setAbiData] = useState<{ [key: string]: string }>({});
  const { currentNetwork } = useStateContext();
  const { ETHERSCAN_KEY } = getConfig();

  const aliasKey = 'xkeeper-abis';

  const getAbi = useCallback(
    async (contractAddress: string) => {
      console.log('getAbi', contractAddress);
      const data = loadLocalStorage(aliasKey);

      if (data[contractAddress]) return data[contractAddress];

      if (!isAddress(contractAddress)) return '';

      const fetchedAbi = await getContractAbi(
        currentNetwork.name,
        currentNetwork.apiUrl,
        contractAddress,
        ETHERSCAN_KEY,
      );
      const newAbiData = { ...data, [contractAddress]: fetchedAbi || '' };
      saveLocalStorage(aliasKey, newAbiData);
      setAbiData(newAbiData);
      return fetchedAbi || '';
    },
    [ETHERSCAN_KEY, currentNetwork.apiUrl, currentNetwork.name],
  );

  useEffect(() => {
    const data = loadLocalStorage(aliasKey);
    setAbiData(data);
  }, []);

  return {
    getAbi,
    abi,
  };
};
