import { useContext } from 'react';
import { AliasContext } from '~/providers';

export const useAlias = () => {
  const context = useContext(AliasContext);

  if (context === undefined) {
    throw new Error('useAlias must be used within a StateProvider');
  }

  return context;
};
