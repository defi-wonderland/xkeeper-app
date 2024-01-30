import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { injectedWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';

import { configureChains, createConfig } from 'wagmi';
import { goerli, mainnet, optimism, arbitrum, polygon, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MockConnector } from 'wagmi/connectors/mock';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { getEnv } from './env';

const { PROJECT_ID, ALCHEMY_KEY, TEST_MODE, TEST_PRIVATE_KEY } = getEnv();

const getWallets = () => {
  if (PROJECT_ID) {
    return [
      injectedWallet({ chains: availableChains }),
      rainbowWallet({ projectId: PROJECT_ID, chains: availableChains }),
      walletConnectWallet({ projectId: PROJECT_ID, chains: availableChains }),
    ];
  } else {
    return [injectedWallet({ chains: availableChains })];
  }
};

export const { chains: availableChains, publicClient } = (() => {
  if (TEST_MODE) {
    return configureChains(
      [goerli],
      [
        jsonRpcProvider({
          rpc: () => ({
            http: 'http://127.0.0.1:8545',
          }),
        }),
      ],
      { batch: { multicall: true } },
    );
  } else {
    return configureChains(
      [goerli, mainnet, optimism, arbitrum, polygon, sepolia],
      [alchemyProvider({ apiKey: ALCHEMY_KEY }), publicProvider()],
      { batch: { multicall: true } },
    );
  }
})();

const config = {
  autoConnect: true,
  connectors: connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: getWallets(),
    },
  ]),
  publicClient,
};

const testConfig = {
  autoConnect: false,
  connectors: [
    new MockConnector({
      options: {
        chainId: goerli.id,
        walletClient: createWalletClient({
          account: privateKeyToAccount(TEST_PRIVATE_KEY),
          transport: http('http://127.0.0.1:8545'),
        }),
      },
    }),
  ],
  publicClient,
};

export const wagmiConfig = createConfig(TEST_MODE ? testConfig : config);
