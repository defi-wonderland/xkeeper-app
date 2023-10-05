import { Address } from 'wagmi';

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
