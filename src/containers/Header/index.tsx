import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { useStateContext } from '~/hooks';
import { THEME_KEY, getTheme } from '~/utils';
import { NavigationLink } from '~/components';

export const Header = () => {
  const { setTheme, theme } = useStateContext();
  const currentTheme = getTheme(theme);

  const handleThemeChange = () => {
    if (theme === 'light') {
      localStorage.setItem(THEME_KEY, 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem(THEME_KEY, 'light');
      setTheme('light');
    }
  };

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '8rem',
        padding: '0 8rem',
        borderBottom: currentTheme.border,
        maxWidth: '100vw',
        fontSize: '1.2rem',
        zIndex: 100,
      }}
    >
      <NavigationLink to='/' text='Keep3r Framework' variant='h5' />

      <IconButton onClick={handleThemeChange} color='inherit'>
        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>

      <ConnectButton />
    </Box>
  );
};
