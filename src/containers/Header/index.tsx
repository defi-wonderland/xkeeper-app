import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Box, IconButton, styled } from '@mui/material';

import { useStateContext } from '~/hooks';
import { Icon, NavigationLink } from '~/components';
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

  const iconType = theme === 'dark' ? 'sun' : 'moon';

  return (
    <HeaderContainer>
      <Navbar>
        <NavigationLink to='/' text='Keep3r Framework' sx={logoStyles} />
        <NavigationLink to='/' text='Docs' sx={navigationLinkStyles} />
      </Navbar>

      <RightSection>
        <IconButton onClick={handleThemeChange} color='inherit'>
          <Icon name={iconType} size='2.4rem' color={currentTheme.textTertiary} />
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
  gap: '3.2rem',
});
