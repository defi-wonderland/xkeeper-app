import { Box, styled } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';

import {
  BaseModal,
  StyledText,
  StyledTitle,
  StyledInput,
  CancelButton,
  ActiveButton,
  WarningChip,
  CloseButton,
} from '~/components';
import { BigModal } from '~/containers';
import { ModalType } from '~/types';
import { useStateContext } from '~/hooks';

export const DepositModal = () => {
  const { modalOpen, setModalOpen, selectedVault } = useStateContext();
  const handleClose = () => setModalOpen(ModalType.NONE);

  return (
    <BaseModal open={modalOpen === ModalType.DEPOSIT}>
      <BigModal>
        <SBox>
          <TitleContainer>
            <StyledTitle>Deposit Funds</StyledTitle>

            <CloseButton variant='text' onClick={handleClose}>
              <SCloseIcon />
            </CloseButton>
          </TitleContainer>

          <StyledText>You can send ETH or any ERC-20 token on the Ethereum network to this adddress.</StyledText>
        </SBox>

        <StyledInput
          label='Deposit address'
          value={(selectedVault?.address as string) || ''}
          setValue={() => {}}
          disabled
        />

        <WarningChip>
          <WarningAmberIcon /> The owner of this vault can withdraw all funds at any time.
        </WarningChip>

        <SButtonsContainer>
          <CancelButton variant='outlined' onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' onClick={handleClose}>
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
  marginTop: '5.6rem',
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

export const SCloseIcon = styled(CloseIcon)({
  fontSize: '2.4rem',
  opacity: 0.6,
});
