import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled, css } from '@mui/system';
import { blue, grey } from '@mui/material/colors';

import { useStateContext } from '~/hooks';
import { ChainIcon, Icon, StyledText } from '~/components';
import { Chains } from '~/types';
import { zIndex } from '~/utils';
import { useSwitchNetwork } from 'wagmi';

interface ChainDropdownProps {
  chains: Chains;
  value: string;
  setValue: (val: string) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function ChainDropdown({ chains, value, setValue, disabled, compact }: ChainDropdownProps) {
  const { currentTheme } = useStateContext();
  const { switchNetworkAsync } = useSwitchNetwork();

  const createHandleMenuClick = (chainId: string) => {
    return async () => {
      switchNetworkAsync && (await switchNetworkAsync(Number(chainId)));
      setValue(chainId);
    };
  };

  const availableChains = Object.keys(chains);

  return (
    <Dropdown>
      {/* Dropdown button */}
      <DropdownTriggerButton disabled={disabled} compact={compact}>
        <ChainIcon chainName={chains[value].name} />
        {!compact && <StyledText>{chains[value].name}</StyledText>}
        <SIcon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />
      </DropdownTriggerButton>

      {/* Dropdown Options */}
      <SMenu slots={{ listbox: StyledListbox }} compact={compact}>
        {availableChains.map((chainId: string) => (
          <StyledMenuItem key={chainId} onClick={createHandleMenuClick(chainId)}>
            <ChainIcon chainName={chains[chainId].name} />
            {chains[chainId].displayName}
          </StyledMenuItem>
        ))}
      </SMenu>
    </Dropdown>
  );
}

export const StyledListbox = styled('ul')(() => {
  const { currentTheme } = useStateContext();
  return {
    border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    boxSizing: 'border-box',
    padding: '6px',
    margin: '12px 0',
    borderRadius: '12px',
    overflow: 'auto',
    outline: '0px',
    background: 'inherit',
    backgroundColor: currentTheme.backgroundSecondary,
  };
});

export const StyledMenuItem = styled(MenuItem)(() => {
  const {
    theme,
    currentTheme: { backgroundHover },
  } = useStateContext();
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
      background-color: ${theme === 'dark' ? backgroundHover : grey[100]};
      color: ${theme === 'dark' ? grey[300] : grey[900]};
    }
  `;
});

interface Props {
  compact?: boolean;
}
export const DropdownTriggerButton = styled(MenuButton)(({ compact }: Props) => {
  const { currentTheme } = useStateContext();
  const iconSize = compact ? '3.15rem' : '2rem';
  const borderRadius = compact ? '10rem' : currentTheme.borderRadius;
  const padding = compact ? '0.6rem 0.8rem 0.6rem 0.6rem' : '1rem 1.4rem';
  return {
    borderRadius,
    padding,
    cursor: 'pointer',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: '0.8rem',
    textTransform: 'capitalize',
    border: currentTheme.inputBorder,
    fontsize: '1.6rem',
    textAlign: 'start',
    backgroundColor: 'inherit',
    height: '4.3rem',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    '&:hover:not(:disabled)': {
      borderColor: currentTheme.textDisabled,
      transition: currentTheme.basicTransition,
    },
    '&:disabled': {
      cursor: 'auto',
      color: currentTheme.textSecondary,
      textTransform: 'none',
    },
    p: {
      fontSize: '1.6rem',
    },
    img: {
      width: iconSize,
      height: iconSize,
      marginTop: '-0.1rem',
    },
  };
});

export const SIcon = styled(Icon)(() => {
  return {
    marginLeft: 'auto',
  };
});

const SMenu = styled(Menu)(({ compact }: Props) => {
  const width = compact ? '20rem' : '60rem';
  return {
    zIndex: zIndex.TOAST,
    width,
    maxWidth: width,
  };
});
