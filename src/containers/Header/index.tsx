import { useEffect, useState } from 'react';
import { Box, IconButton, styled } from '@mui/material';

import { useModal, useStateContext, useTheme } from '~/hooks';
import { ChainDropdown, ConnectButton, Icon, NavigationLink, StyledText } from '~/components';
import { themeKey, zIndex } from '~/utils';
import { ModalType } from '~/types';

export const Header = () => {
  const { availableChains, currentNetwork } = useStateContext();
  const { modalOpen } = useModal();
  const { setTheme, theme, currentTheme } = useTheme();

  const [selectedChain, setSelectedChain] = useState(currentNetwork.id.toString());
  const [menuOpen, setMenuOpen] = useState(false);

  const handleThemeChange = () => {
    if (theme === 'light') {
      localStorage.setItem(themeKey, 'dark');
      setTheme('dark');
    } else {
      localStorage.setItem(themeKey, 'light');
      setTheme('light');
    }
  };

  const handleMenuOpen = () => {
    setMenuOpen((prev) => !prev);
  };

  const logoStyles = {
    fontSize: '2rem',
    fontWeight: '500',
  };

  const navigationLinkStyles = {
    fontSize: '1.6rem',
    fontWeight: '500',
    color: currentTheme.textDisabled,
    '&:hover': {
      color: currentTheme.textPrimary,
      transition: currentTheme.basicTransition,
    },
    '@media (max-width: 600px)': {
      color: currentTheme.textPrimary,
    },
  };

  const themeText = theme === 'light' ? 'dark' : 'light';
  const themeIcon = theme === 'dark' ? 'sun' : 'moon';
  const menuIcon = menuOpen ? 'close' : 'mobile-menu';

  useEffect(() => {
    setSelectedChain(currentNetwork.id.toString());
  }, [currentNetwork]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('div[role="menu"]')) {
        return;
      }
      setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <HeaderContainer role='menu'>
        <Navbar>
          <NavigationLink disabled={modalOpen !== ModalType.NONE} to='/' text='xKeeper' sx={logoStyles} />
          <NavigationLink to='/' text='Docs' sx={navigationLinkStyles} external />
        </Navbar>

        <RightSection>
          <SIconButton onClick={handleThemeChange} color='inherit'>
            <Icon name={themeIcon} size='2.4rem' color={currentTheme.textTertiary} />
          </SIconButton>

          <ChainDropdown
            chains={availableChains}
            value={selectedChain}
            setValue={setSelectedChain}
            disabled={modalOpen !== ModalType.NONE}
            compact
          />
          <ConnectButton />

          <SIconButton onClick={handleMenuOpen}>
            <SMobileMenu name={menuIcon} size='2.4rem' color={currentTheme.textTertiary} />
          </SIconButton>
        </RightSection>
      </HeaderContainer>

      {/* Mobile Menu */}
      {menuOpen && (
        <MobileMenuContainer role='menu'>
          <NavigationLink to='/' text='Docs' sx={navigationLinkStyles} external />

          <SIconButton onClick={handleThemeChange} color='inherit'>
            <Icon name={themeIcon} size='2.4rem' color={currentTheme.textTertiary} />
            <SText>{themeText} theme</SText>
          </SIconButton>
          <SBox>
            <ConnectButton />
          </SBox>
        </MobileMenuContainer>
      )}
    </>
  );
};

const HeaderContainer = styled(Box)(() => {
  const { theme, currentTheme } = useTheme();
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

    '@media (max-width: 600px)': {
      padding: '1.6rem 1.2rem',
    },
  };
});

const Navbar = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '4rem',

  '@media (max-width: 600px)': {
    'div:nth-child(2)': {
      display: 'none',
    },
  },
});

const RightSection = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '3.2rem',

  '@media (max-width: 600px)': {
    gap: '1.2rem',

    'button:nth-child(1), button:nth-child(3)': {
      display: 'none',
    },
  },
});

const SIconButton = styled(IconButton)(() => {
  const { currentTheme } = useTheme();
  return {
    textTransform: 'capitalize',
    gap: '1.2rem',
    borderRadius: currentTheme.borderRadius,

    '&:hover': {
      backgroundColor: 'inherit',
    },
    '&:hover i:before': {
      color: currentTheme.textPrimary,
      transition: currentTheme.basicTransition,
    },
  };
});

const SMobileMenu = styled(Icon)(() => {
  return {
    cursor: 'pointer',

    '@media (min-width: 600px)': {
      display: 'none',
    },
  };
});

const MobileMenuContainer = styled(Box)(() => {
  const { currentTheme } = useTheme();
  return {
    position: 'fixed',
    paddingTop: '1.6rem',
    top: '8rem',
    right: '4.8rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.6rem',
    backgroundColor: currentTheme.backgroundSecondary,
    borderBottom: currentTheme.border,
    width: '100%',
    zIndex: `calc(${zIndex.HEADER} - 1)`,

    'div:nth-child(1), button:nth-child(2)': {
      padding: '0 1.6rem',
    },

    '@media (max-width: 600px)': {
      right: '0',

      animation: 'fadeIn 0.2s ease',
      '@keyframes fadeIn': {
        '0%': {
          transform: 'translateY(-100%)',
        },
        '100%': {
          transform: 'translateY(0)',
        },
      },
    },
  };
});

const SText = styled(StyledText)(() => {
  return {
    fontSize: '1.6rem',
    fontWeight: '500',
  };
});

const SBox = styled(Box)(() => {
  const { currentTheme } = useTheme();
  return {
    width: '100%',
    padding: '1.6rem',
    borderTop: currentTheme.border,
  };
});
