import { Box, styled } from '@mui/material';

import {
  BaseModal,
  StyledText,
  StyledTitle,
  StyledInput,
  CancelButton,
  ActiveButton,
  WarningChip,
  CloseButton,
  Icon,
} from '~/components';
import { BigModal } from '~/containers';
import { ModalType } from '~/types';
import { useModal, useStateContext, useTheme } from '~/hooks';

export const DepositModal = () => {
  const { selectedVault, currentNetwork } = useStateContext();
  const { modalOpen, closeModal } = useModal();
  const { currentTheme } = useTheme();

  return (
    <BaseModal open={modalOpen === ModalType.DEPOSIT}>
      <BigModal>
        <SBox>
          <TitleContainer>
            <StyledTitle>Deposit Funds</StyledTitle>

            <CloseButton variant='text' onClick={closeModal}>
              <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
            </CloseButton>
          </TitleContainer>

          <StyledText>
            You can send ETH or any ERC-20 token on the {currentNetwork.displayName} network to this adddress.
          </StyledText>
        </SBox>

        <StyledInput label='Deposit address' value={(selectedVault?.address as string) || ''} copyable />

        <WarningChip>
          <Icon name='exclamation-triangle' size='2rem' color={currentTheme.warningChipColor} />
          The owner of this vault can withdraw all funds at any time.
        </WarningChip>

        <SButtonsContainer>
          <CancelButton variant='outlined' onClick={closeModal}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' onClick={closeModal}>
            Done
          </ActiveButton>
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

const SButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  marginTop: '4rem',
  button: {
    width: '100%',
  },
});

export const TitleContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
});
