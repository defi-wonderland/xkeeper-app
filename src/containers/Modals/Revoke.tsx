import { styled, Box } from '@mui/material';

import { SModal, OptionsMenuProps, StyledTitle, StyledText, CancelButton, RevokeButton } from '~/components';
import { useStateContext } from '~/hooks';
import { ModalType } from '~/types';

export const RevokeModal = ({ type, value }: OptionsMenuProps) => {
  const { setNotificationOpen, setModalOpen } = useStateContext();

  const handleConfirm = () => {
    console.log('Revoke', type, value);
    setModalOpen(ModalType.NONE);
    setNotificationOpen(true);
  };

  return (
    <SModal>
      <SBox>
        <StyledTitle>Revoke {type}</StyledTitle>

        <StyledText>
          Are you sure you want to revoke <span>{value}</span>? This action cannot be undone.
        </StyledText>
      </SBox>

      <ButtonsContainer>
        <CancelButton variant='outlined' onClick={() => setModalOpen(ModalType.NONE)}>
          Cancel
        </CancelButton>

        <RevokeButton variant='contained' onClick={handleConfirm}>
          Revoke {type}
        </RevokeButton>
      </ButtonsContainer>
    </SModal>
  );
};

export const SBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  marginBottom: '2.4rem',
  width: '40rem',
});

export const ButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  button: {
    width: '100%',
  },
});
