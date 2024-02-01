import { Address, Hex, formatUnits, parseUnits } from 'viem';
import { PublicClient } from 'wagmi';

import { vaultABI } from '~/generated';
import { AliasData, EventData, TokenData } from '~/types';

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

export const handleOpenTx = (scanner: string, hash: Hex | string) => {
  window.open(`${scanner}/tx/${hash}`, '_blank');
};

export const handleOpenAddress = (scanner: string, address: Hex | string) => {
  window.open(`${scanner}/address/${address}`, '_blank');
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

export const getVaultEvents = async (
  publicClient: PublicClient,
  fromBlock: bigint = 0n,
  vaultAddress?: Address,
): Promise<EventData[]> => {
  const jobs = await publicClient.getContractEvents({
    address: vaultAddress,
    abi: vaultABI,
    fromBlock: fromBlock,
    eventName: 'JobExecuted',
  });

  const payments = await publicClient.getContractEvents({
    address: vaultAddress,
    abi: vaultABI,
    fromBlock: fromBlock,
    eventName: 'IssuePayment',
  });

  const formattedDataPromise = jobs.map(async (job) => {
    const timestamp = await getTimestamp(publicClient, job.blockNumber);
    const payment = payments.filter((payment) => payment.transactionHash === job.transactionHash);
    const otherJobs = jobs.filter((j) => j.transactionHash === job.transactionHash);

    const formattedPayments = payment.map((payment) => {
      return {
        feeToken: payment.args._feeToken?.toString() || '',
        feeRecipient: payment.args._feeRecipient?.toString() || '',
        feeAmount: payment.args._fee?.toString() || '',
      };
    });

    const formattedJobs = otherJobs.map((job) => {
      return {
        job: job.args._job?.toString() || '',
        jobData: job.args._jobData?.toString() || '',
        relay: job.args._relay?.toString() || '',
        relayCaller: job.args._relayCaller?.toString() || '',
      };
    });

    return {
      hash: job.transactionHash,
      blockNumber: job.blockNumber,
      jobs: formattedJobs,
      payments: formattedPayments,
      date: formatTimestamp(timestamp),
    };
  });

  const formattedData = await Promise.all(formattedDataPromise);

  const uniqueEvents: EventData[] = [];
  const uniqueHashes: string[] = [];

  formattedData.forEach((event) => {
    if (!uniqueHashes.includes(event.hash)) {
      uniqueEvents.push(event);
      uniqueHashes.push(event.hash);
    }
  });

  return uniqueEvents;
};

// Get the current chain name, if sepolia return ethereum
export const getChainName = (publicClient: PublicClient) => {
  const currentChain = publicClient.chain.name.toLowerCase();
  return currentChain === 'sepolia' ? 'ethereum' : currentChain;
};
