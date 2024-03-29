import { useMemo } from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { styled } from '@mui/system';
import { getFunctionSelector } from 'viem';
import { AbiFunction } from 'abitype';

import { StyledText, CustomScrollbar, DropdownTriggerButton, StyledMenuItem, SIcon } from '~/components';
import { useTheme } from '~/hooks';

interface FunctionDropdownProps {
  value: string;
  setValue: (selector: string, name: string) => void;
  setSignature: (val: string) => void;
  disabled?: boolean;
  abi: string;
}

export function FunctionDropdown({ value, setValue, abi, setSignature, disabled }: FunctionDropdownProps) {
  const { currentTheme } = useTheme();

  const createHandleMenuClick = (value: AbiFunction) => {
    return () => {
      const signature = getFunctionSelector(value);
      setSignature(signature);
      setValue(signature, value.name);
    };
  };

  const availableValues: AbiFunction[] = useMemo(() => {
    try {
      if (!abi) return [];
      const res: AbiFunction[] = JSON.parse(abi).filter(
        (x: AbiFunction) =>
          x.type === 'function' && (x.stateMutability === 'nonpayable' || x.stateMutability === 'payable'),
      );
      return res;
    } catch (error) {
      console.error('Error parsing ABI');
      return [];
    }
  }, [abi]);

  const noWriteFunctionsFound = !availableValues.length || !abi;

  return (
    <Dropdown>
      {/* Dropdown button */}
      <DropdownTriggerButton disabled={disabled || noWriteFunctionsFound}>
        <StyledText>
          {noWriteFunctionsFound && 'No write functions found'}
          {!noWriteFunctionsFound && (value || 'Choose Function Selector')}
        </StyledText>
        {!noWriteFunctionsFound && <SIcon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />}
      </DropdownTriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: BasicStyledListbox }}>
        <SCustomScrollbar>
          {!!availableValues &&
            availableValues.map((value: AbiFunction) => (
              <FunctionMenuItem key={value.name} onClick={createHandleMenuClick(value)}>
                {`${value.name} (${getFunctionSelector(value)})`}
              </FunctionMenuItem>
            ))}
        </SCustomScrollbar>
      </Menu>
    </Dropdown>
  );
}

const SCustomScrollbar = styled(CustomScrollbar)({
  padding: '0.2rem',
  maxHeight: '17rem',
});

export const BasicStyledListbox = styled('ul')(() => {
  const { currentTheme } = useTheme();
  return {
    border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    color: currentTheme.textSecondary,
    backgroundColor: currentTheme.backgroundSecondary,
    width: '59.6rem',
    fontSize: '1.4rem',
    boxSizing: 'border-box',
    padding: '6px',
    margin: '12px 0',
    borderRadius: currentTheme.borderRadius,
    overflow: 'auto',
    outline: '0px',

    '@media (max-width: 600px)': {
      width: '100%',
    },
  };
});

const FunctionMenuItem = styled(StyledMenuItem)({
  textTransform: 'none',
});
