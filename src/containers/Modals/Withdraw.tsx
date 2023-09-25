import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { ActiveButton, BaseModal, CancelButton, InfoChip, StyledInput, StyledText, StyledTitle } from '~/components';
import { BigModal } from '~/containers';
import { useStateContext } from '~/hooks';

interface WithdrawModalProps {
  children: React.ReactNode;
}

export const WithdrawtModal = ({ children }: WithdrawModalProps) => {
  const [widthdrawalAddress, setWithdrawalAddress] = useState('');
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');

  // temporary
  const vaultName = 'Connext One';
  const network = 'Ethereum';

  return (
    <BaseModal triggerButton={children}>
      <BigModal>
        <TitleContainer>
          <StyledTitle>Withdraw Modal</StyledTitle>

          <InfoContainer>
            <VaultText>
              Vault: <span>{vaultName}</span>
            </VaultText>

            <Divider />

            <NetworkText>
              Network: <InfoChip>{network} (ERC-20)</InfoChip>
            </NetworkText>
          </InfoContainer>
        </TitleContainer>

        <StyledInput label='Withdrawal address' value={widthdrawalAddress} setValue={setWithdrawalAddress} />

        <StyledInput label='Token' value={token} setValue={setToken} />

        <StyledInput
          label='Amount'
          value={amount}
          setValue={setAmount}
          description='Available: 12 ETH'
          placeholder='0'
        />

        <SButtonsContainer>
          <CancelButton variant='outlined' onClick={close}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained'>Confirm</ActiveButton>
        </SButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

const TitleContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  justifyContent: 'space-between',
  marginBottom: '2.4rem',
});

const InfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.6rem',
});

const VaultText = styled(StyledText)(() => {
  return {
    span: {
      fontWeight: 500,
    },
  };
});

const NetworkText = styled(StyledText)(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.4rem',
  };
});

const Divider = styled('div')(() => {
  const { currentTheme } = useStateContext();
  return {
    width: '0.1rem',
    backgroundColor: currentTheme.backButtonBorderColor,
  };
});

const SButtonsContainer = styled(Box)({
  marginTop: '5.6rem',
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
});
