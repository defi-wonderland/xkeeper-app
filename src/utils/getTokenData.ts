import { erc20ABI } from 'wagmi';
import { Address, formatUnits } from 'viem';

import { Token, TokenData } from '~/types';
import { publicClient, getConfig } from '~/config';
import { getUsdBalance } from '~/utils';

interface CallResult {
  result: bigint;
  error?: Error;
  status: 'success' | 'failure';
}

export const getTokensData = async (tokenList: Token[], vaultAddress: Address): Promise<TokenData[]> => {
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

    // temporary fixed price
    const price = '110000000000000000000';

    const result = contractCallsResult.map(({ result }, index) => ({
      name: tokenList[index].name,
      symbol: tokenList[index].symbol,
      address: tokenList[index].address,
      decimals: tokenList[index].decimals,
      balanceE18: result.toString(),
      balance: formatUnits(result, tokenList[index].decimals),
      balanceUSD: getUsdBalance(price, result.toString(), tokenList[index].decimals),
      price: price,
    }));

    result.push({
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
      address: getConfig().DEFAULT_ETH_ADDRESS,
      balanceE18: ethBalanceResult.toString(),
      balance: formatUnits(ethBalanceResult, 18),
      balanceUSD: getUsdBalance(price, ethBalanceResult.toString(), 18),
      price: price,
    });

    return result.reverse();
  } catch (error) {
    console.error('Error loading token data', error);
    return [];
  }
};
