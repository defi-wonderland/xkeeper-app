import { Address } from 'wagmi';

export interface VaultData {
  address: Address;
  chain: string;
  balance: string;
  owner: Address | undefined;
  name: string | undefined;
  relays: readonly Address[];
  jobs: readonly Address[];
}
