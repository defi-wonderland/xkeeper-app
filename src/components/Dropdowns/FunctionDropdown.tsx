import { useMemo } from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { styled } from '@mui/system';
import { getFunctionSelector } from 'viem';
import { AbiFunction } from 'abitype';

import { StyledText, CustomScrollbar, DropdownTriggerButton, StyledMenuItem, SIcon } from '~/components';
import { useStateContext } from '~/hooks';

interface FunctionDropdownProps {
  value: string;
  setValue: (val: string) => void;
  setSignature: (val: string) => void;
  disabled?: boolean;
  abi: string;
}

export function FunctionDropdown({ value, setValue, abi, setSignature, disabled }: FunctionDropdownProps) {
  const { currentTheme } = useStateContext();

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

  const noWriteFunctionsFound = !availableValues.length || !abi;

  return (
    <Dropdown>
      {/* Dropdown button */}
      <DropdownTriggerButton disabled={disabled || noWriteFunctionsFound}>
        <StyledText>
          {noWriteFunctionsFound && 'No write functions found'}
          {!noWriteFunctionsFound && (value || availableValues[0]?.name)}
        </StyledText>
        {!noWriteFunctionsFound && <SIcon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />}
      </DropdownTriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: BasicStyledListbox }}>
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

const SCustomScrollbar = styled(CustomScrollbar)({
  padding: '0.2rem',
  maxHeight: '17rem',
});

export const BasicStyledListbox = styled('ul')(() => {
  const { currentTheme } = useStateContext();
  return {
    border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    color: currentTheme.textSecondary,
    backgroundColor: currentTheme.backgroundSecondary,
    width: '60rem',
    fontSize: '1.4rem',
    boxSizing: 'border-box',
    padding: '6px',
    margin: '12px 0',
    borderRadius: '12px',
    overflow: 'auto',
    outline: '0px',
  };
});
