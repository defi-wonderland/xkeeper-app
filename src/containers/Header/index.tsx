import { Link } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styled from 'styled-components';

import { useStateContext } from '~/hooks';
import { THEME_KEY } from '~/utils';

export const Header = () => {
  const { setTheme, theme } = useStateContext();

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
    <SNavbar>
      <LogoContainer>
        <Logo to='/'>Logo</Logo>
      </LogoContainer>

      <ConnectButton />
      <button onClick={handleThemeChange}>Toggle Theme</button>
    </SNavbar>
  );
};

export const SNavbar = styled.div`
  display: flex;
  height: 8rem;
  padding: 0 8rem;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.headerBackground};
  border-bottom: ${({ theme }) => theme.border};
  width: 100%;
  max-width: 100vw;
  z-index: 100;
`;

export const LogoContainer = styled.div`
  width: fit-content;
`;

export const Logo = styled(Link)`
  display: block;
  font-style: italic;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 2rem;
`;
