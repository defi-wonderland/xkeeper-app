import { createContext, useCallback, useEffect, useState } from 'react';

import { AliasData } from '~/types';
import { aliasKey, loadLocalStorage } from '~/utils';

type ContextType = {
  aliasData: AliasData;
  updateAliasData: () => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const AliasContext = createContext({} as ContextType);

export const AliasProvider = ({ children }: StateProps) => {
  const [aliasData, setAliasData] = useState<AliasData>({});

  // Load alias data from local storage
  const updateAliasData = useCallback(async () => {
    const data = loadLocalStorage(aliasKey);
    setAliasData(data);
  }, []);

  // Load alias data on load
  useEffect(() => {
    updateAliasData();
  }, [updateAliasData]);

  return (
    <AliasContext.Provider
      value={{
        aliasData,
        updateAliasData,
      }}
    >
      {children}
    </AliasContext.Provider>
  );
};
