import '@rainbow-me/rainbowkit/styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig } from 'wagmi';
import { BrowserRouter } from 'react-router-dom';

import { wagmiConfig } from './config';
import { StateProvider } from './providers';
import { App } from '~/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <BrowserRouter>
        <StateProvider>
          <App />
        </StateProvider>
      </BrowserRouter>
    </WagmiConfig>
  </React.StrictMode>,
);
