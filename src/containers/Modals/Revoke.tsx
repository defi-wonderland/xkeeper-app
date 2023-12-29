import { styled, Box } from '@mui/material';

import { StyledTitle, StyledText, CancelButton, RevokeButton, BaseModal, ConfirmText } from '~/components';
import { useModal, useStateContext, useVault } from '~/hooks';
import { getReceiptMessage, truncateAddress } from '~/utils';
import { ModalType, Status } from '~/types';

export const RevokeModal = () => {
  const { selectedItem, selectedVault } = useStateContext();
  const { setModalOpen, modalOpen } = useModal();

  const type = selectedItem.type;
  const value = selectedItem.address;

  const functionName = selectedItem?.type === 'relay' ? 'revokeRelayCallers' : 'revokeJobSelectors';

  const { requestStatus, handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: functionName,
    args: [selectedItem.address, selectedItem.params],
    notificationTitle: `${type} successfully revoked`,
    notificationMessage: getReceiptMessage(value, 'has been revoked and is no longer active'),
  });
  const isLoading = requestStatus === Status.LOADING;

  return (
    <BaseModal open={modalOpen === ModalType.REVOQUE}>
      <SBox>
        <StyledTitle>Revoke {type}</StyledTitle>

        <StyledText>
          Are you sure you want to revoke <span>{truncateAddress(value)}</span>? This action cannot be undone.
        </StyledText>
      </SBox>

      <ButtonsContainer>
        <CancelButton variant='outlined' disabled={isLoading} onClick={() => setModalOpen(ModalType.NONE)}>
          Cancel
        </CancelButton>

        <RevokeButton
          data-test='confirm-revoke'
          variant='contained'
          disabled={!writeAsync || isLoading}
          onClick={handleSendTransaction}
        >
          <ConfirmText isLoading={isLoading} />
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
