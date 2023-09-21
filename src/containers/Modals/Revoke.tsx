import { styled, Box } from '@mui/material';

import { SModal, OptionsMenuProps, ModalTitle, ModalText, CancelButton, RevokeButton } from '~/components';

interface RevokeModalProps extends OptionsMenuProps {
  close: () => void;
}

export const RevokeModal = ({ type, value, close }: RevokeModalProps) => {
  return (
    <SModal>
      <SBox>
        <ModalTitle>Revoke {type}</ModalTitle>

        <ModalText>
          Are you sure you want to revoke <span>{value}</span>? This action cannot be undone.
        </ModalText>
      </SBox>

      <ButtonsContainer>
        <CancelButton variant='outlined' onClick={close}>
          Cancel
        </CancelButton>

        <RevokeButton variant='contained'>Revoke {type}</RevokeButton>
      </ButtonsContainer>
    </SModal>
  );
};

export const SBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  marginBottom: '2.4rem',
});

export const ButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
});
