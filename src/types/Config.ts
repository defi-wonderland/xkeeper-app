import { Address } from 'viem';
import { ThemeName } from './Theme';

export interface Env {
  RPC_URL: string;
  PROJECT_ID: string;
  ALCHEMY_KEY: string;
  TEST_MODE: boolean;
  TEST_PRIVATE_KEY: Address;
  ETHERSCAN_KEY: string;
}

export interface Constants {
  DEFAULT_CHAIN: number;
  DEFAULT_THEME: ThemeName;
  DEFAULT_ETH_ADDRESS: string;
  DEFAULT_WETH_ADDRESS: string;
  addresses: Addresses;
  availableChains: Chains;
  vaultFactoryVersion: string;
}

export interface Addresses {
  [key: string | number]: {
    AutomationVaultFactory: Address;
    xKeeperMetadata: Address;
    relays: {
      GelatoRelay: Address;
      OpenRelay: Address;
      Keep3rRelay: Address;
      Keep3rBondedRelay: Address;
    };
  };
}

export interface Chain {
  displayName: string;
  name: string;
  scanner: string;
  id: number;
  apiUrl: string;
  alchemyUrl: string;
  nativeToken: {
    symbol: string;
    name: string;
  };
}

export interface Chains {
  [chainId: string]: Chain;
}

export interface Items {
  value: string;
  itemCopied: boolean;
}

export interface Notification {
  open: boolean;
  title?: string;
  message?: string | JSX.Element;
  type?: string;
  error?: boolean;
}

export enum Status {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  IDLE = 'IDLE',
}

export interface Config extends Env, Constants {}
