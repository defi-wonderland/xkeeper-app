import { useMemo } from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { blue, grey } from '@mui/material/colors';
import { styled, css } from '@mui/system';
import { getFunctionSelector } from 'viem';
import { AbiFunction } from 'abitype';

import { useStateContext } from '~/hooks';
import { StyledText, CustomScrollbar } from '~/components';

interface FunctionDropdownProps {
  value: string;
  setValue: (val: string) => void;
  setSignature: (val: string) => void;
  disabled?: boolean;
  abi: string;
}

export function FunctionDropdown({ value, setValue, abi, setSignature, disabled }: FunctionDropdownProps) {
  const createHandleMenuClick = (value: AbiFunction) => {
    return () => {
      const signature = getFunctionSelector(value);
      setSignature(signature);
      setValue(value.name);
    };
  };

  const availableValues: AbiFunction[] = useMemo(() => {
    try {
      const res: AbiFunction[] = JSON.parse(abi).filter(
        (x: AbiFunction) =>
          x.type === 'function' && (x.stateMutability === 'nonpayable' || x.stateMutability === 'payable'),
      );
      return res;
    } catch (error) {
      console.log(error);
      return [];
    }
  }, [abi]);

  return (
    <Dropdown>
      {/* Dropdown button */}
      <TriggerButton disabled={disabled}>
        <StyledText>{value || availableValues[0]?.name}</StyledText>
      </TriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: StyledListbox }}>
        <SCustomScrollbar>
          {!!availableValues &&
            availableValues.map((value: AbiFunction) => (
              <StyledMenuItem key={value.name} onClick={createHandleMenuClick(value)}>
                {value.name}
              </StyledMenuItem>
            ))}
        </SCustomScrollbar>
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

const StyledMenuItem = styled(MenuItem)(({ theme }) => {
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
    border: currentTheme.inputBorder,
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

const SCustomScrollbar = styled(CustomScrollbar)({
  padding: '0.2rem',
  maxHeight: '17rem',
});
