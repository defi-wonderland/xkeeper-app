import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { styled } from '@mui/system';

import {
  StyledText,
  CustomScrollbar,
  DropdownTriggerButton,
  StyledMenuItem,
  SIcon,
  BasicStyledListbox,
} from '~/components';
import { useStateContext } from '~/hooks';
import { getRelayName } from '~/utils';

interface RelayDropdownProps {
  value: string;
  setValue: (val: string) => void;
  disabled?: boolean;
  availableValues: string[];
  setCustomRelay: (value: boolean) => void;
  customRelay?: boolean;
}

export function RelayDropdown({
  value,
  setValue,
  availableValues,
  disabled,
  customRelay,
  setCustomRelay,
}: RelayDropdownProps) {
  const { currentTheme } = useStateContext();

  const createHandleMenuClick = (value: string) => {
    return () => {
      if (value === 'Choose Relay') {
        setValue('');
        setCustomRelay(true);
        return;
      }
      setValue(value);
      setCustomRelay(false);
    };
  };

  return (
    <Dropdown>
      {/* Dropdown button */}
      <DropdownTriggerButton disabled={disabled} data-test='relay-dropdown-button'>
        <StyledText>
          {customRelay && 'Custom Relay'}
          {!customRelay && value}
        </StyledText>
        {!disabled && <SIcon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />}
      </DropdownTriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: BasicStyledListbox }}>
        <SCustomScrollbar>
          {!!availableValues &&
            availableValues.map((value, index) => (
              <StyledMenuItem
                key={value}
                data-test={`relay-dropdown-option-${index}`}
                onClick={createHandleMenuClick(value)}
              >
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
