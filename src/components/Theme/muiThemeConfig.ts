import { createTheme } from '@mui/material';
import { Theme, ThemeName } from '~/types';
import { zIndex } from '~/utils';

export const getMuiGLobalConfig = (currentTheme: Theme, mode: ThemeName) => {
  return createTheme({
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
          ['*:focus-visible']: {
            border: 'none',
            outline: 'none',
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

          ['&::-webkit-scrollbar-thumb:hover']: {
            background: currentTheme.textDisabled,
          },

          ['&::-webkit-scrollbar-thumb:active']: {
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
  });
};
