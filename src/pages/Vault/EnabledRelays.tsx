import { Box, Card, styled } from '@mui/material';

import { ActiveButton } from '~/components';
import { ModalType } from '~/types';
import { useModal, useStateContext, useTheme } from '~/hooks';

export const EnabledRelays = () => {
  const { userAddress, selectedVault } = useStateContext();
  const { setModalOpen } = useModal();

  return (
    <>
      {selectedVault?.owner === userAddress && (
        <SCard variant='outlined'>
          <SContainer>
            <ActiveButton
              data-test='add-relay-button'
              variant='contained'
              onClick={() => setModalOpen(ModalType.ADD_RELAY)}
            >
              Add New Relay
            </ActiveButton>
          </SContainer>
        </SCard>
      )}
    </>
  );
};

export const SCard = styled(Card)(() => {
  const { currentTheme } = useTheme();
  return {
    backgroundColor: currentTheme.backgroundPrimary,
    borderRadius: currentTheme.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxShadow: '0px 2px 10px 0px rgba(16, 24, 40, 0.02)',
    marginTop: '2.4rem',
  };
});

const SContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '2rem',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1.6rem',
  },
});
