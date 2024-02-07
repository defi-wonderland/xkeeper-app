import tokenList from '~/assets/tokens.json';
import { Token } from '~/types';
import { getConstants } from '~/config/constants';

export const getTokenList = (chainId?: number): Token[] => {
  if (chainId == 1337 || !chainId) {
    chainId = getConstants().DEFAULT_CHAIN;
  }
  return tokenList.tokens.filter((token) => token.chainId == chainId);
};
