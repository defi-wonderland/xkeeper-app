import { defineConfig } from '@wagmi/cli';

// Update those imports with the npm package later
import { abi as VaultFactoryAbi } from './abis/IAutomationVaultFactory.sol/IAutomationVaultFactory.json';
import { abi as VaultAbi } from './abis/IAutomationVault.sol/IAutomationVault.json';
// import { abi as xKeeperMetadatAbi } from './abis/IXKeeperMetadata.sol/IXKeeperMetadata.json';

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { name: 'vaultFactory', abi: VaultFactoryAbi as any },
    { name: 'vault', abi: VaultAbi },
    // { name: 'xkeeperMetadata', abi: xKeeperMetadatAbi },
  ],
  plugins: [],
});
