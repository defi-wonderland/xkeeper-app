import { useState } from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';

import { useStateContext } from '~/hooks';

export function ChainDropdown() {
  const [selectedChain, setSelectedChain] = useState('Ethereum Mainnet');

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      setSelectedChain(menuItem);
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <Dropdown>
      {/* Dropdown button */}
      <TriggerButton>
        <EditIcon />
        {selectedChain}
      </TriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: StyledListbox }}>
        <StyledMenuItem onClick={createHandleMenuClick('Profile')}>Profile</StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('Language settings')}>Language settings</StyledMenuItem>
        <StyledMenuItem onClick={createHandleMenuClick('Log out')}>Log out</StyledMenuItem>
      </Menu>
    </Dropdown>
  );
}

// temporary styles
const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledListbox = styled('ul')(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.4rem',
    boxSizing: 'border-box',
    padding: '6px',
    margin: '12px 0',
    width: '60rem',
    borderRadius: '12px',
    overflow: 'auto',
    outline: '0px',
    background: 'inherit',
    border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    backgroundColor: currentTheme.backgroundSecondary,
    color: currentTheme.textSecondary,
  };
});

// temporary styles
const StyledMenuItem = styled(MenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const TriggerButton = styled(MenuButton)(() => {
  const { currentTheme } = useStateContext();
  return {
    border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    borderRadius: currentTheme.borderRadius,
    fontsize: '1.6rem',
    textAlign: 'start',
    backgroundColor: 'inherit',
    height: '4.3rem',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    '&:hover': {
      border: `1px solid ${currentTheme.textPrimary}`,
    },
  };
});
