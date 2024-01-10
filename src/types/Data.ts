import { Hex, Address } from 'viem';

export interface CallResult {
  result: bigint;
  error?: Error;
  status: 'success' | 'failure';
}

export interface VaultData {
  address: Address;
  chain: string;
  owner: Address | undefined;
  name: string | undefined;
  nativeToken: Address;
  relays: RelayData;
  tokens: TokenData[];
  totalValue: string;
  events?: EventData[];
  description?: string;
}

export type RelayResult = (
  | {
      error: Error;
      result?: undefined;
      status: 'failure';
    }
  | {
      error?: undefined;
      result: RelayData;
      status: 'success';
    }
)[];

export type RelayDataResult = [Address[], JobsData];

export type JobsData = { job: Address; functionSelectors: Hex[] }[];

export interface RelayData {
  [relayAddress: string]: {
    callers: Address[];
    jobsData: JobsData;
  };
}

export interface SelectedItem {
  type: OptionsType;
  vaultAddress?: Address;
  jobAddress?: Address;
  relayAddress?: Address;
  params?: Hex[];
}

export interface TokenData {
  name: string;
  symbol: string;
  decimals: number;
  balanceE18: string;
  balance: string;
  address: string;
  price: number;
  balanceUSD: string;
}

export interface EventData {
  hash: Hex;
  blockNumber: bigint;
  date: string;
  jobs: JobEventData[];
  payments: PaymentData[];
}

export interface JobEventData {
  job: string;
  jobData: string;
  relay: string;
  relayCaller: string;
}

export interface PaymentData {
  feeToken: string;
  feeRecipient: string;
  feeAmount: string;
}

export interface AliasData {
  [address: string]: string;
}

export interface PriceData {
  coins: {
    [chainAndAddress: string]: {
      decimals: number;
      symbol: string;
      price: number;
      timestamp: number;
      confidence: number;
    };
  };
}
export type OptionsType = 'vault' | 'job' | 'caller';
