import { Address } from 'viem';

export interface Env {
  RPC_URL: string;
  PROJECT_ID: string;
  ALCHEMY_KEY: string;
}

export interface Constants {
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
  };
}

export interface Config extends Env, Constants {}
