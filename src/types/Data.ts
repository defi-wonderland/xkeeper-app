import { Hex, Address } from 'viem';

export interface VaultData {
  address: Address;
  chain: string;
  balance: string;
  owner: Address | undefined;
  name: string | undefined;
  relays: RelayData;
  jobs: JobData;
}

export interface RelayData {
  [relayAddress: string]: Address[];
}

export interface JobData {
  [jobAddress: string]: string[];
}

export interface SelectedItem {
  type: string;
  address: Address;
  params: Hex[];
}

export type OptionsType = 'vault' | 'job' | 'relay';
