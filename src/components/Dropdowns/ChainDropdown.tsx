import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled, css } from '@mui/system';
import { blue, grey } from '@mui/material/colors';
import { useSwitchNetwork } from 'wagmi';

import { useStateContext, useTheme } from '~/hooks';
import { ChainIcon, Icon, StyledText } from '~/components';
import { Chains } from '~/types';
import { zIndex } from '~/utils';

interface ChainDropdownProps {
  chains: Chains;
  value: string;
  setValue: (val: string) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function ChainDropdown({ chains, value, setValue, disabled, compact }: ChainDropdownProps) {
  const { setCurrentNetwork, availableChains } = useStateContext();
  const { currentTheme } = useTheme();
  const { switchNetworkAsync } = useSwitchNetwork();

  const createHandleMenuClick = (chainId: string) => {
    return async () => {
      switchNetworkAsync && (await switchNetworkAsync(Number(chainId)));
      setCurrentNetwork(availableChains[chainId]);
      setValue(chainId);
    };
  };

  const availableChainIds = Object.keys(chains);

  const getBorderColor = (chainId: string) => ({
    border: `${Number(chainId) === chains[value].id && currentTheme.border}`,
  });

  return (
    <Dropdown>
      {/* Dropdown button */}
      <DropdownTriggerButton disabled={disabled} compact={compact?.toString()}>
        <ChainIcon chainName={chains[value].name} />
        {!compact && <StyledText>{chains[value].name}</StyledText>}
        <SIcon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />
      </DropdownTriggerButton>

      {/* Dropdown Options */}
      <SMenu slots={{ listbox: StyledListbox }} compact={compact?.toString()}>
        {availableChainIds.map((chainId: string) => (
          <StyledMenuItem key={chainId} onClick={createHandleMenuClick(chainId)} sx={getBorderColor(chainId)}>
            <ChainIcon chainName={chains[chainId].name} />
            {chains[chainId].displayName}
            {Number(chainId) === chains[value].id && (
              <SIcon name='check' color={currentTheme.textSecondary} size='1.6rem' />
            )}
          </StyledMenuItem>
        ))}
      </SMenu>
    </Dropdown>
  );
}

export const StyledListbox = styled('ul')(() => {
  const { currentTheme } = useTheme();
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
  } = useTheme();
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
  compact?: string;
}
export const DropdownTriggerButton = styled(MenuButton)(({ compact }: Props) => {
  const { currentTheme } = useTheme();
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
    height: '4.5rem',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    '&:hover:not(:disabled)': {
      borderColor: currentTheme.textDisabled,
      transition: currentTheme.basicTransition,
      'i:before': {
        color: currentTheme.textSecondary,
        transition: currentTheme.basicTransition,
      },
    },
    '&:disabled': {
      cursor: 'auto',
      color: currentTheme.textSecondary,
      backgroundColor: currentTheme.inputDisabledBackground,
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
  const width = compact ? '22rem' : '60rem';
  return {
    zIndex: zIndex.TOAST,
    width,
    maxWidth: width,

    '@media (max-width: 600px)': {
      width: '100%',
      padding: '0 1.6rem',
    },
  };
});
