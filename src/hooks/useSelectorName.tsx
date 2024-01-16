import { useCallback, useEffect, useState } from 'react';

import { loadLocalStorage, saveLocalStorage } from '~/utils';

export const useSelectorName = () => {
  const [selectors, setSelectors] = useState<{ [key: string]: string }>({});

  const selectorsKey = 'xkeeper-selectors';

  const setSelectorName = useCallback(async (functionSelector: string, name: string) => {
    const data = loadLocalStorage(selectorsKey);

    const newAbiData = { ...data, [functionSelector]: name };
    saveLocalStorage(selectorsKey, newAbiData);
    setSelectors(newAbiData);
  }, []);

  // Load alias data from local storage
  const updateAliasData = useCallback(async () => {
    const data = loadLocalStorage(selectorsKey);
    setSelectors(data);
  }, []);

  // Load alias data on load
  useEffect(() => {
    updateAliasData();
  }, [updateAliasData]);

  return {
    setSelectorName,
    selectors,
  };
};
