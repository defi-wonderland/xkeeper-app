import { defineConfig } from '@wagmi/cli';

// Update those imports with the npm package later
import { abi as VaultFactoryAbi } from './abis/IAutomationVaultFactory.sol/IAutomationVaultFactory.json';
import { abi as VaultAbi } from './abis/IAutomationVault.sol/IAutomationVault.json';

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    { name: 'vaultFactory', abi: VaultFactoryAbi },
    { name: 'vault', abi: VaultAbi },
  ],
  plugins: [],
});
