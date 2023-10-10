import { Address } from 'viem';

export interface Env {
  RPC_URL: string;
  PROJECT_ID: string;
  ALCHEMY_KEY: string;
}

export interface Constants {
  DEFAULT_CHAIN: number;
  addresses: Addresses;
  availableChains: Chains;
}

export interface Addresses {
  AutomationVaultFactory: Address;
  GelatoRelay: Address;
  OpenRelay: Address;
  Keep3rRelay: Address;
}

export interface Chains {
  [chainId: string]: {
    name: string;
    iconName: string;
    scanner: string;
  };
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
