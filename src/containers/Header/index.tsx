import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material/styles';

import { useStateContext } from '~/hooks';
import { NavigationLink } from '~/components';
import { THEME_KEY } from '~/utils';

export const Header = () => {
  const { setTheme, theme, currentTheme } = useStateContext();

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
    <HeaderContainer
      sx={{
        borderBottom: currentTheme.border,
        backgroundColor: currentTheme.backgroundPrimary,
      }}
    >
      <Navbar>
        <NavigationLink to='/' text='Keep3r Framework' variant='h5' sx={{ fontWeight: '500', fontSize: '2rem' }} />
        <NavigationLink to='/' text='Docs' variant='h5' sx={{ fontWeight: '500', color: currentTheme.textDisabled }} />
      </Navbar>

      <RightSection>
        <IconButton onClick={handleThemeChange} color='inherit'>
          {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <ConnectButton />
      </RightSection>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  height: '8rem',
  padding: '0 4.8rem',
  maxWidth: '100vw',
  fontSize: '1.2rem',
  zIndex: 100,
});

const Navbar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4rem',
});

const RightSection = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4.2rem',
});
