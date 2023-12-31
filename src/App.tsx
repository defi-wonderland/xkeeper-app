import '~/assets/kf-icons/style.css';

import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import CssBaseline from '@mui/material/CssBaseline';

import { ScrollToTop, useTheme } from '~/hooks';
import { CreateVault, Landing, Vault } from '~/pages';
import { AppLayout } from '~/containers';
import { UseSnackbar, customTheme } from '~/components';
import { availableChains } from '~/config';
import { zIndex } from './utils';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Landing />} />
        <Route path='/vault/:address' element={<Vault />} />
        <Route path='/create' element={<CreateVault />} />
      </Route>
    </Routes>
  );
};

export const App = () => {
  const { theme: mode, currentTheme } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                fontSize: '62.5%',
                backgroundColor: currentTheme.backgroundSecondary,
              },
              ['.Mui-expanded']: {
                zIndex: zIndex.MODAL,
              },
              ['&::-webkit-scrollbar']: {
                width: '0.6rem',
                height: ' 0.6rem',
                background: currentTheme.backgroundPrimary,
              },

              ['&::-webkit-scrollbar-thumb']: {
                background: currentTheme.textSecondaryDisabled,
                borderRadius: '0.4rem',
              },

              [' &::-webkit-scrollbar-thumb:hover']: {
                background: currentTheme.textDisabled,
              },

              [' &::-webkit-scrollbar-thumb:active']: {
                background: currentTheme.textDisabled,
              },
            },
          },
        },
        typography: {
          fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
        },
      }),
    [
      currentTheme.backgroundPrimary,
      currentTheme.backgroundSecondary,
      currentTheme.textDisabled,
      currentTheme.textSecondaryDisabled,
      mode,
    ],
  );

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
