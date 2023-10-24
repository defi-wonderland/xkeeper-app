import { Address, Hex, formatUnits, parseUnits } from 'viem';
import { PublicClient } from 'wagmi';

import { vaultABI } from '~/generated';
import { AliasData, TokenData } from '~/types';

export const truncateAddress = (address?: string, chars = 4) => {
  if (!address) return '-';
  return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`;
};

export const truncateFunctionSignature = (bytes: string) => {
  return bytes.slice(0, 10);
};

export const copyData = (data?: string) => {
  if (!data) return;
  navigator.clipboard.writeText(data);
};

export const getUsdBalance = (price: number, balance: string, decimals: number): string => {
  const priceBN = parseUnits(price.toString(), decimals);
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
  if (res === 0) return `${currency ? '$0' : '0'}`;

  if (decimals !== 0) res = Number.parseFloat(formatUnits(BigInt(input), decimals));

  if (res < 0.01) return `${currency ? '$' : ''}<0.01`;

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: formatDecimal,
    notation: compact ? 'compact' : 'standard',
    style: currency ? 'currency' : 'decimal',
    currency: 'USD',
  }).format(res);
}

// Load data from localStorage
export const loadLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {};
};

// Save data to localStorage
export const saveLocalStorage = (key: string, data: AliasData) => {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(key, stringifiedData);
};

export const handleOpenTx = (scanner: string, hash: Hex) => {
  window.open(`${scanner}/tx/${hash}`, '_blank');
};

export const formatTimestamp = (timestamp: string): string => {
  if (!timestamp) return '-';
  const date = new Date(Number(timestamp) * 1000);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const getTimestamp = async (publicClient: PublicClient, blockNumber: bigint) => {
  const blockData = await publicClient.getBlock({ blockNumber });
  return blockData.timestamp.toString();
};

export const getVaultEvents = async (publicClient: PublicClient, fromBlock: bigint = 0n, vaultAddress?: Address) => {
  return await publicClient.getContractEvents({
    address: vaultAddress,
    abi: vaultABI,
    fromBlock: fromBlock,
  });
};
