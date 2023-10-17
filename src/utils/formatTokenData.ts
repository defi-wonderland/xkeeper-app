import { formatUnits } from 'viem';

import { Token, TokenData, PriceData, CallResult } from '~/types';
import { getConfig } from '~/config';
import { getUsdBalance } from '~/utils';

export const formatTokensData = (
  tokenList: Token[],
  contractCallsResult: CallResult[],
  ethBalanceResult: bigint,
  chainName: string,
  prices: PriceData,
): TokenData[] => {
  try {
    const ethAddress = getConfig().DEFAULT_ETH_ADDRESS;
    const ethPrice = prices.coins[`${chainName}:${ethAddress}`].price || 0;

    const result = contractCallsResult.map(({ result }, index) => {
      const price = prices.coins[`${chainName}:${tokenList[index].address}`].price || 0;
      return {
        name: tokenList[index].name,
        symbol: tokenList[index].symbol,
        address: tokenList[index].address,
        decimals: tokenList[index].decimals,
        balanceE18: result.toString(),
        balance: formatUnits(result, tokenList[index].decimals),
        balanceUSD: getUsdBalance(price, result.toString(), tokenList[index].decimals),
        price: price,
      };
    });

    result.push({
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      address: ethAddress,
      balanceE18: ethBalanceResult.toString(),
      balance: formatUnits(ethBalanceResult, 18),
      balanceUSD: getUsdBalance(ethPrice, ethBalanceResult.toString(), 18),
      price: ethPrice,
    });

    return result.reverse();
  } catch (error) {
    console.error('Error loading token data', error);
    return [];
  }
};
