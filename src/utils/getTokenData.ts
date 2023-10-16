import { erc20ABI } from 'wagmi';
import { Address, formatUnits } from 'viem';

import { Token, TokenData, PriceData } from '~/types';
import { publicClient, getConfig } from '~/config';
import { getUsdBalance } from '~/utils';

interface CallResult {
  result: bigint;
  error?: Error;
  status: 'success' | 'failure';
}

export const getTokensData = async (
  tokenList: Token[],
  vaultAddress: Address,
  chainName: string,
  prices: PriceData,
): Promise<TokenData[]> => {
  try {
    const contracts = tokenList.map((token) => ({
      address: token.address as Address,
      abi: erc20ABI,
      functionName: 'balanceOf',
      args: [vaultAddress],
    }));

    const ethBalance = publicClient.getBalance({ address: vaultAddress });

    const contractCalls = publicClient.multicall({
      contracts: contracts,
    }) as Promise<CallResult[]>;

    const [ethBalanceResult, contractCallsResult] = await Promise.all([ethBalance, contractCalls]);

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

    const ethPrice = prices.coins[`${chainName}:${getConfig().DEFAULT_ETH_ADDRESS}`].price || 0;
    result.push({
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      address: getConfig().DEFAULT_ETH_ADDRESS,
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
