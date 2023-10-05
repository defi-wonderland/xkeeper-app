import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ScrollToTop, useStateContext } from '~/hooks';
import { CreateVault, Landing, Vault } from '~/pages';
import {
  AppLayout,
  DepositModal,
  EditAliasModal,
  JobModal,
  RelayModal,
  RevokeModal,
  WithdrawtModal,
} from '~/containers';
import { UseSnackbar } from '~/components';
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

const Modals = () => {
  return (
    <>
      <DepositModal />
      <JobModal />
      <RelayModal />
      <WithdrawtModal />
      <EditAliasModal />
      <RevokeModal />
    </>
  );
};

export const App = () => {
  const { theme: mode, currentTheme } = useStateContext();

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
    [currentTheme.backgroundSecondary, mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Modals />
      <CssBaseline />
      <ScrollToTop />
      <AppRouter />
      <UseSnackbar />
    </ThemeProvider>
  );
};
