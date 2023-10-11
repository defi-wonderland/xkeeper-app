import { formatUnits } from 'viem';
import { TokenData } from '~/types';

export const truncateAddress = (address: string, chars = 4) => {
  return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`;
};

export const truncateFunctionSignature = (bytes: string) => {
  return bytes.slice(0, 10);
};

export const copyData = (data: string) => {
  navigator.clipboard.writeText(data);
};

export const getUsdBalance = (price: string, balance: string, decimals: number): string => {
  const priceBN = BigInt(price);
  const balanceBN = BigInt(balance);
  const result = (priceBN * balanceBN) / BigInt(10 ** decimals);
  return result.toString();
};

export const getTotalUsdBalance = (tokenData: TokenData[]): string => {
  const total = tokenData.reduce((acc, token) => {
    return acc + parseFloat(token.balanceUSD);
  }, 0);
  return total.toString();
};

/**
 * @dev Format a number to a string
 * @param input BigNumber string to format
 * @param decimals Number of BigNumber's decimals
 * @param formatDecimal Number of decimals to format to
 * @param currency Format as currency
 * @param compact Format as compact
 * @returns Formatted number
 */
export function formatDataNumber(
  input: string,
  decimals = 18,
  formatDecimal = 2,
  currency?: boolean,
  compact?: boolean,
) {
  let res: number = Number.parseFloat(input);
  if (res === 0) return '0';

  if (decimals !== 0) res = Number.parseFloat(formatUnits(BigInt(input), decimals));

  if (res < 0.01) return `${currency ? '$' : ''}<0.01`;

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: formatDecimal,
    notation: compact ? 'compact' : 'standard',
    style: currency ? 'currency' : 'decimal',
    currency: 'USD',
  }).format(res);
}
