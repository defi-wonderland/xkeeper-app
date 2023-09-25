import { useState } from 'react';
import { Box, styled } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import { BaseModal, StyledText, StyledTitle, StyledInput, CancelButton, ActiveButton, WarningChip } from '~/components';
import { BigModal } from './Job';
import { ButtonsContainer } from './Revoke';

interface DepositModalProps {
  children: React.ReactNode;
}

export const DepositModal = ({ children }: DepositModalProps) => {
  const [depositAddress, setDepositAddress] = useState('');
  return (
    <BaseModal triggerButton={children}>
      <BigModal>
        <SBox>
          <StyledTitle>Deposit Modal</StyledTitle>
          <StyledText>You can send ETH or any ERC-20 token on the Ethereum network to this adddress.</StyledText>
        </SBox>

        <StyledInput label='Deposit address' value={depositAddress} setValue={setDepositAddress} />

        <WarningChip>
          <WarningAmberIcon /> The owner of this vault can withdraw all funds at any time.
        </WarningChip>

        <SButtonsContainer>
          <CancelButton variant='outlined' onClick={close}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained'>Done</ActiveButton>
        </SButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

const SBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  marginBottom: '2.4rem',
});

const SButtonsContainer = styled(ButtonsContainer)({ marginTop: '5.6rem' });
