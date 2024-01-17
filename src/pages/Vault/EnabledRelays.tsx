import { Box, styled } from '@mui/material';

import { ActiveButton, StyledTitle } from '~/components';
import { ModalType } from '~/types';
import { useModal, useStateContext } from '~/hooks';
import { SCard } from './Tokens';

export const EnabledRelays = () => {
  const { userAddress, selectedVault } = useStateContext();
  const { setModalOpen } = useModal();

  return (
    <SCard variant='outlined'>
      <SContainer>
        <StyledTitle>Enabled Relays</StyledTitle>
        <ActiveButton
          disabled={selectedVault?.owner !== userAddress}
          data-test='add-relay-button'
          variant='contained'
          onClick={() => setModalOpen(ModalType.ADD_RELAY)}
        >
          Add New Relay
        </ActiveButton>
      </SContainer>
    </SCard>
  );
};

const SContainer = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.6rem',

    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'start',
      gap: '1.6rem',
    },
  };
});
