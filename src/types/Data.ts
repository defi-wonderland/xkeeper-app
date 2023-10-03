import { Address } from 'wagmi';

export interface VaultData {
  address: Address;
  chain: string;
  balance: string;
  owner: Address | undefined;
  name: string | undefined;
  relays: RelayData;
  jobs: readonly Address[];
}

export interface RelayData {
  [relayAddress: Address]: Address[];
}
