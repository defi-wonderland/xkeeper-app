import { styled, Box } from '@mui/material';

import { StyledTitle, StyledText, CancelButton, RevokeButton, BaseModal } from '~/components';
import { useStateContext, useVault } from '~/hooks';
import { truncateAddress } from '~/utils';
import { ModalType } from '~/types';

export const RevokeModal = () => {
  const { setModalOpen, modalOpen, selectedItem, selectedVault, loading } = useStateContext();

  const type = selectedItem.type;
  const value = selectedItem.address;

  const functionName = selectedItem?.type === 'relay' ? 'revokeRelayCallers' : 'revokeJobFunctions';

  const { handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: functionName,
    args: [selectedItem.address, selectedItem.params],
    notificationTitle: `${type} successfully revoked`,
    notificationMessage: (
      <>
        <span>{value}</span> has been revoked and is no longer active.
      </>
    ),
  });

  return (
    <BaseModal open={modalOpen === ModalType.REVOQUE}>
      <SBox>
        <StyledTitle>Revoke {type}</StyledTitle>

        <StyledText>
          Are you sure you want to revoke <span>{truncateAddress(value)}</span>? This action cannot be undone.
        </StyledText>
      </SBox>

      <ButtonsContainer>
        <CancelButton variant='outlined' disabled={loading} onClick={() => setModalOpen(ModalType.NONE)}>
          Cancel
        </CancelButton>

        <RevokeButton variant='contained' disabled={!writeAsync || loading} onClick={handleSendTransaction}>
          {!loading && `Revoke ${type}`}
          {loading && `Loading...`}
        </RevokeButton>
      </ButtonsContainer>
    </BaseModal>
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
