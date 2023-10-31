import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { injectedWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { goerli, mainnet, optimism, arbitrum, polygon } from 'wagmi/chains';

import { StateProvider } from './providers';
import { App } from '~/App';

import '@rainbow-me/rainbowkit/styles.css';
import { getConfig } from './config';

const { PROJECT_ID, ALCHEMY_KEY } = getConfig();

export const { chains: availableChains, publicClient } = configureChains(
  [goerli, mainnet, optimism, arbitrum, polygon],
  [alchemyProvider({ apiKey: ALCHEMY_KEY }), publicProvider()],
  { batch: { multicall: true } },
);

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

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: getWallets(),
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <HashRouter>
        <StateProvider>
          <App />
        </StateProvider>
      </HashRouter>
    </WagmiConfig>
  </React.StrictMode>,
);
