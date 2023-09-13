import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ScrollToTop, useStateContext } from '~/hooks';
import { Landing, Vault } from '~/pages';
import { AppLayout } from '~/containers';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='/' element={<Landing />} />
        <Route path='/vault/:address' element={<Vault />} />
      </Route>
    </Routes>
  );
};

export const App = () => {
  const { theme: mode } = useStateContext();

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
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <AppRouter />
    </ThemeProvider>
  );
};
