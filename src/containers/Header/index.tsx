import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { styled } from '@mui/material/styles';

import { useStateContext } from '~/hooks';
import { NavigationLink } from '~/components';
import { THEME_KEY, zIndex } from '~/utils';

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
  const logoStyles = {
    fontSize: '2rem',
    fontWeight: '500',
  };

  const navigationLinkStyles = { fontSize: '1.6rem', fontWeight: '500', color: currentTheme.textDisabled };

  return (
    <HeaderContainer>
      <Navbar>
        <NavigationLink to='/' text='Keep3r Framework' sx={logoStyles} />
        <NavigationLink to='/' text='Docs' sx={navigationLinkStyles} />
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

const HeaderContainer = styled(Box)(() => {
  const { theme, currentTheme } = useStateContext();
  return {
    borderBottom: currentTheme.border,
    backgroundColor: theme === 'light' ? currentTheme.backgroundPrimary : currentTheme.backgroundSecondary,
    zIndex: zIndex.HEADER,
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
  };
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
