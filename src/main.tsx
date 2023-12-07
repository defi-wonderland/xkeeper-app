import '@rainbow-me/rainbowkit/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { wagmiConfig } from './config';
import { StateProvider } from './providers';
import { App } from '~/App';

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
