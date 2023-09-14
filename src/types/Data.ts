export interface VaultData {
  name: string;
  address: string;
  balance: string;
  relays: string[];
  chain: string;
  owned?: boolean;
}
