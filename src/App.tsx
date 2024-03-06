import '~/assets/kf-icons/style.css';

import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import CssBaseline from '@mui/material/CssBaseline';

import { ScrollToTop, useTheme } from '~/hooks';
import { CreateVault, Landing, Vault } from '~/pages';
import { AppLayout } from '~/containers';
import { UseSnackbar, customTheme, getMuiGLobalConfig } from '~/components';
import { availableChains } from '~/config';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Landing />} />
        <Route path='/:chain/vault/:address' element={<Vault />} />
        <Route path='/create' element={<CreateVault />} />
      </Route>
    </Routes>
  );
};

export const App = () => {
  const { theme: mode, currentTheme } = useTheme();
  const theme = useMemo(() => getMuiGLobalConfig(currentTheme, mode), [currentTheme, mode]);

  return (
    <RainbowKitProvider theme={customTheme(currentTheme)} chains={availableChains}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop />
        <AppRouter />
        <UseSnackbar />
      </ThemeProvider>
    </RainbowKitProvider>
  );
};
