import { Box, styled } from '@mui/material';

import { ActiveButton, StyledTitle } from '~/components';
import { ModalType } from '~/types';
import { useModal, useStateContext } from '~/hooks';

export const EnabledRelays = () => {
  const { userAddress, selectedVault } = useStateContext();
  const { setModalOpen } = useModal();

  return (
    <>
      {userAddress && selectedVault?.owner === userAddress && (
        <SContainer>
          <StyledTitle>Enabled Relays</StyledTitle>
          <ActiveButton
            data-test='add-relay-button'
            variant='contained'
            onClick={() => setModalOpen(ModalType.ADD_RELAY)}
          >
            Add New Relay
          </ActiveButton>
        </SContainer>
      )}
    </>
  );
};

const SContainer = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '4rem 2rem',

    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'start',
      gap: '1.6rem',
    },
  };
});
