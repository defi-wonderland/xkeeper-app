import { useState } from 'react';
import { Box, Button, styled } from '@mui/material';

import { ActiveButton, BaseModal, CancelButton, StyledTitle, CloseButton, ConfirmText, Icon } from '~/components';
import { useModal, useStateContext, useTheme, useVault } from '~/hooks';
import { TitleContainer } from '~/containers';
import { getReceiptMessage } from '~/utils';
import { StyledAccordion } from './Accordion';
import { RelaySection } from './RelaySection';
import { ModalType, Status } from '~/types';

export const RelayModal = () => {
  const { selectedVault } = useStateContext();
  const { modalOpen, setModalOpen } = useModal();
  const { currentTheme } = useTheme();

  const [relayAddress, setRelayAddress] = useState<string>('');
  const [callersList, setCallersList] = useState<string[]>([]);

  const handleClose = () => setModalOpen(ModalType.NONE);

  const { requestStatus, handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'approveRelayData',
    args: [relayAddress, callersList, []],
    notificationTitle: 'Relay successfuly approved',
    notificationMessage: getReceiptMessage(relayAddress, 'relay is now enabled'),
  });

  const isLoading = requestStatus === Status.LOADING;

  return (
    <BaseModal open={modalOpen === ModalType.ADD_RELAY}>
      <BigModal>
        {/* Header */}
        <STitleContainer>
          <StyledTitle>Add New Relay</StyledTitle>

          <CloseButton variant='text' onClick={handleClose}>
            <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
          </CloseButton>
        </STitleContainer>

        {/* Relay Section */}
        <RelaySection relayAddress={relayAddress} setRelayAddress={setRelayAddress} isLoading={isLoading} />

        {/* Accordion Section */}
        <StyledAccordion callersList={callersList} setCallersList={setCallersList} isLoading={isLoading} />

        {/* Buttons Section */}
        <SButtonsContainer>
          <CancelButton variant='outlined' disabled={isLoading} onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton
            variant='contained'
            disabled={!writeAsync || isLoading}
            onClick={handleSendTransaction}
            data-test='confirm-new-relay-button'
          >
            <ConfirmText isLoading={isLoading} />
          </ActiveButton>
        </SButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

export const TextButton = styled(Button)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.actionButton,
    width: '23rem',
    padding: 0,
    justifyContent: 'flex-start',
    '&:hover': {
      background: 'inherit',
    },
    '&:disabled': {
      color: 'inherit',
      opacity: '0.7',
    },
    svg: {
      color: currentTheme.actionButton,
    },
  };
});

export const BigModal = styled(Box)({
  width: '59.6rem',

  '@media (max-width: 600px)': {
    width: '100%',
  },
});

export const DropdownContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
  width: '100%',
});

const SButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  paddingTop: '1.6rem',
  button: {
    width: '100%',
  },
});

const STitleContainer = styled(TitleContainer)({
  marginBottom: '1.6rem',
});
