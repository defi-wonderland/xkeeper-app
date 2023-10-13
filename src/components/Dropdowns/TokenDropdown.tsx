import { Dropdown } from '@mui/base/Dropdown';
import { styled } from '@mui/material';
import { Menu } from '@mui/base/Menu';

import { useStateContext } from '~/hooks';
import {
  CustomScrollbar,
  SIcon,
  StyledListbox,
  StyledMenuItem,
  StyledText,
  TokenIcon,
  TriggerButton,
} from '~/components';
import { TokenData } from '~/types';

interface TokenDropdownProps {
  value: TokenData;
  setValue: (val: TokenData) => void;
  tokens?: TokenData[];
  disabled?: boolean;
}

export function TokenDropdown({ tokens, value, setValue, disabled }: TokenDropdownProps) {
  const { currentTheme, currentNetwork } = useStateContext();
  const createHandleMenuClick = (menuItem: TokenData) => {
    return () => {
      setValue(menuItem);
    };
  };

  const customIcon = {
    img: {
      height: '2.4rem',
      width: '2.4rem ',
    },
  };

  return (
    <Dropdown>
      {/* Dropdown button */}
      <TriggerButton sx={customIcon} disabled={disabled}>
        <TokenIcon chainName={currentNetwork.name} tokenAddress={value?.address} />
        <StyledText>{value?.symbol}</StyledText>
        <SIcon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />
      </TriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: StyledListbox }}>
        <SCustomScrollbar>
          {!!tokens?.length &&
            tokens.map((token) => (
              <StyledMenuItem key={token.address} onClick={createHandleMenuClick(token)} sx={customIcon}>
                <TokenIcon chainName={currentNetwork.name} tokenAddress={token.address} />
                {token.symbol}
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
