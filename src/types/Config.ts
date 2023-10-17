import { Address } from 'viem';

export interface Env {
  RPC_URL: string;
  PROJECT_ID: string;
  ALCHEMY_KEY: string;
}

export interface Constants {
  DEFAULT_CHAIN: number;
  DEFAULT_ETH_ADDRESS: string;
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
}

export interface Config extends Env, Constants {}
