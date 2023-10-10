import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled, css } from '@mui/system';
import { blue, grey } from '@mui/material/colors';

import { useStateContext } from '~/hooks';
import { ChainIcon, Icon, StyledText } from '~/components';
import { Chains } from '~/types';

interface ChainDropdownProps {
  chains: Chains;
  value: string;
  setValue: (val: string) => void;
  disabled?: boolean;
}

export function ChainDropdown({ chains, value, setValue, disabled }: ChainDropdownProps) {
  const { currentTheme } = useStateContext();
  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      setValue(menuItem);
    };
  };

  const availableChains = Object.keys(chains);

  return (
    <Dropdown>
      {/* Dropdown button */}
      <TriggerButton disabled={disabled}>
        <ChainIcon chainName={chains[value].iconName} />
        <StyledText>{chains[value].iconName}</StyledText>
        <SIcon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />
      </TriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: StyledListbox }}>
        {availableChains
          .filter((chainId: string) => chainId !== value)
          .map((chainId: string) => (
            <StyledMenuItem key={chainId} onClick={createHandleMenuClick(chainId)}>
              <ChainIcon chainName={chains[chainId].iconName} />
              {chains[chainId].name}
            </StyledMenuItem>
          ))}
      </Menu>
    </Dropdown>
  );
}

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

const StyledMenuItem = styled(MenuItem)(() => {
  const { theme } = useStateContext();
  return css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    text-transform: capitalize;
    gap: 0.8rem;
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;

    &:last-of-type {
      border-bottom: none;
    }

    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${theme === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme === 'dark' ? grey[800] : grey[100]};
      color: ${theme === 'dark' ? grey[300] : grey[900]};
    }

    &.${menuItemClasses.disabled} {
      color: ${theme === 'dark' ? grey[700] : grey[400]};
    }

    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme === 'dark' ? grey[800] : grey[100]};
      color: ${theme === 'dark' ? grey[300] : grey[900]};
    }
  `;
});

const TriggerButton = styled(MenuButton)(() => {
  const { currentTheme } = useStateContext();
  return {
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '0.8rem',
    textTransform: 'capitalize',
    padding: '1rem 1.4rem',
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
    p: {
      fontSize: '1.6rem',
    },
  };
});

const SIcon = styled(Icon)(() => {
  return {
    marginLeft: 'auto',
  };
});
