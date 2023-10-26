import { Address } from 'viem';
import { ThemeName } from './Theme';

export interface Env {
  RPC_URL: string;
  PROJECT_ID: string;
  ALCHEMY_KEY: string;
}

export interface Constants {
  DEFAULT_CHAIN: number;
  DEFAULT_THEME: ThemeName;
  DEFAULT_ETH_ADDRESS: string;
  DEFAULT_WETH_ADDRESS: string;
  addresses: Addresses;
  availableChains: Chains;
}

export interface Addresses {
  AutomationVaultFactory: Address;
  relays: {
    GelatoRelay: Address;
    OpenRelay: Address;
    Keep3rRelay: Address;
  };
}

export interface Chain {
  displayName: string;
  name: string;
  scanner: string;
  id: number;
  apiUrl: string;
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

export interface Config extends Env, Constants {}
