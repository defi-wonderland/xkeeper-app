import { useEffect, useMemo, useState } from 'react';
import { Box, Button, styled } from '@mui/material';

import { ActiveButton, BaseModal, CancelButton, StyledTitle, CloseButton, ConfirmText, Icon } from '~/components';
import { useModal, useStateContext, useTheme, useVault } from '~/hooks';
import { JobsData, ModalType, Status } from '~/types';
import { TitleContainer } from '~/containers';
import { getReceiptMessage } from '~/utils';
import { StyledAccordion } from './Accordion';
import { RelaySection } from './RelaySection';

export const RelayModal = () => {
  const { selectedVault, selectedItem } = useStateContext();
  const { modalOpen, closeModal } = useModal();
  const { currentTheme } = useTheme();

  const [relayAddress, setRelayAddress] = useState<string>('');
  const [callersList, setCallersList] = useState<string[]>([]);

  const [jobsCount, setJobsCount] = useState<number>(0);
  const [jobsData, setJobsData] = useState<JobsData>([]);

  const [isError, setIsError] = useState<boolean>(false);

  const args = useMemo(() => [relayAddress, callersList, jobsData], [callersList, jobsData, relayAddress]);
  const functionName = useMemo(
    () => (selectedItem?.selectedAddress && selectedVault ? 'modifyRelay' : 'addRelay'),
    [selectedItem?.selectedAddress, selectedVault],
  );

  const { requestStatus, handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName,
    args,
    notificationTitle: 'Relay successfuly approved',
    notificationMessage: getReceiptMessage(relayAddress, 'relay is now enabled'),
  });

  const isLoading = requestStatus === Status.LOADING;

  // If selectedItem exists, fill the modal with the selected relay
  useEffect(() => {
    if (selectedItem?.selectedAddress && selectedVault) {
      const relays = Object.entries(selectedVault.relays);
      const selectedRelay = relays.find((relay) => relay[0] === selectedItem?.selectedAddress);
      if (!selectedRelay) return;
      setRelayAddress(selectedRelay[0]);
      setCallersList(selectedRelay[1].callers);
      setJobsData(selectedRelay[1].jobsData);
      setJobsCount(selectedRelay[1].jobsData.length);
    }
  }, [selectedItem?.selectedAddress, selectedVault]);

  // Reset values when modal is closed
  useEffect(() => {
    if (modalOpen === ModalType.NONE) {
      setRelayAddress('');
      setCallersList([]);
      setJobsData([]);
      setJobsCount(0);
    }
  }, [modalOpen]);

  return (
    <BaseModal open={modalOpen === ModalType.ADD_RELAY}>
      <BigModal>
        {/* Header */}
        <STitleContainer>
          <StyledTitle>{selectedItem?.selectedAddress ? 'Edit Relay' : 'Add New Relay'}</StyledTitle>

          <CloseButton variant='text' onClick={closeModal}>
            <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
          </CloseButton>
        </STitleContainer>

        {/* Relay Section */}
        <RelaySection relayAddress={relayAddress} setRelayAddress={setRelayAddress} isLoading={isLoading} />

        {/* Accordion Section */}
        <StyledAccordion
          relayAddress={relayAddress}
          callersList={callersList}
          setCallersList={setCallersList}
          jobsData={jobsData}
          setJobsData={setJobsData}
          jobsCount={jobsCount}
          setJobsCount={setJobsCount}
          isLoading={isLoading}
          isError={isError}
          setIsError={setIsError}
        />

        {/* Buttons Section */}
        <SButtonsContainer>
          <CancelButton variant='outlined' disabled={isLoading} onClick={closeModal}>
            Cancel
          </CancelButton>

          <ActiveButton
            variant='contained'
            disabled={!writeAsync || isLoading || isError}
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
