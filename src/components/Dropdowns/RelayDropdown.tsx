import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { styled } from '@mui/system';

import { StyledText, CustomScrollbar, DropdownTriggerButton, StyledListbox, StyledMenuItem, SIcon } from '~/components';
import { useStateContext } from '~/hooks';
import { getRelayName } from '~/utils';

interface RelayDropdownProps {
  value: string;
  setValue: (val: string) => void;
  disabled?: boolean;
  availableValues: string[];
}

export function RelayDropdown({ value, setValue, availableValues, disabled }: RelayDropdownProps) {
  const { currentTheme } = useStateContext();

  const createHandleMenuClick = (value: string) => {
    return () => {
      setValue(value);
    };
  };

  return (
    <Dropdown>
      {/* Dropdown button */}
      <DropdownTriggerButton disabled={disabled}>
        <StyledText>{value}</StyledText>
        {!disabled && <SIcon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />}
      </DropdownTriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: StyledListbox }}>
        <SCustomScrollbar>
          {!!availableValues &&
            availableValues.map((value) => (
              <StyledMenuItem key={value} onClick={createHandleMenuClick(value)}>
                {getRelayName(value)}
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
