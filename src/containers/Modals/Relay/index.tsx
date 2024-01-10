import { useEffect, useMemo, useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { isAddress } from 'viem';

import { ActiveButton, BaseModal, CancelButton, StyledTitle, CloseButton, Icon, ConfirmText } from '~/components';
import { BigModal, TitleContainer } from '~/containers';
import { anyCaller, getReceiptMessage } from '~/utils';
import { useModal, useStateContext, useTheme, useVault } from '~/hooks';
import { ModalType, Status } from '~/types';
import { getConfig } from '~/config';
import { RelaySection } from './RelaySection';

export const RelayModal = () => {
  const { selectedVault, selectedItem } = useStateContext();
  const { modalOpen, setModalOpen } = useModal();
  const { currentTheme } = useTheme();

  const [relayAddress, setRelayAddress] = useState<string>('');
  const [callerAddress, setCallerAddress] = useState<string>('');
  const [callers, setCallers] = useState<string[]>([]);
  const [allowAnyCaller, setAllowAnyCaller] = useState(false);
  const [customRelay, setCustomRelay] = useState(false);

  const selectedRelayAddress = useMemo(() => selectedItem?.relayAddress || '', [selectedItem]);

  const handleClose = () => setModalOpen(ModalType.NONE);
  const {
    addresses: { relays },
  } = getConfig();

  const callerList = useMemo(() => {
    if (allowAnyCaller) {
      return [anyCaller];
    } else {
      return [callerAddress, ...callers];
    }
  }, [allowAnyCaller, callerAddress, callers]);

  const editRelay = useMemo(() => {
    return isAddress(selectedRelayAddress);
  }, [selectedRelayAddress]);

  const availableValues = useMemo(() => [...Object.values(relays), 'Choose Relay'], [relays]);

  const { requestStatus, handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'approveRelayData',
    args: [relayAddress, callerList, []],
    notificationTitle: 'Relay successfuly approved',
    notificationMessage: getReceiptMessage(relayAddress, 'relay is now enabled'),
  });
  const isLoading = requestStatus === Status.LOADING;

  useEffect(() => {
    if (allowAnyCaller) {
      setCallers([anyCaller]);
      setCallerAddress(anyCaller);
    }
  }, [allowAnyCaller]);

  useEffect(() => {
    setCustomRelay(false);
    setRelayAddress(editRelay ? selectedRelayAddress : '');
  }, [selectedItem, editRelay, selectedRelayAddress]);

  useEffect(() => {
    setCallerAddress('');
    setAllowAnyCaller(false);
  }, [modalOpen]);

  // Reset values when modal is closed
  useEffect(() => {
    if (modalOpen === ModalType.NONE) {
      setRelayAddress('');
      setCallers([]);
    }
  }, [availableValues, modalOpen, setCallers, setRelayAddress]);

  return (
    <BaseModal open={modalOpen === ModalType.ADD_RELAY}>
      <BigModal>
        <TitleContainer>
          <StyledTitle>Add New Relay</StyledTitle>

          <CloseButton variant='text' onClick={handleClose}>
            <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
          </CloseButton>
        </TitleContainer>

        <RelaySection
          isLoading={isLoading}
          relayAddress={relayAddress}
          setRelayAddress={setRelayAddress}
          callerAddress={callerAddress}
          setCallerAddress={setCallerAddress}
          callers={callers}
          setCallers={setCallers}
          allowAnyCaller={allowAnyCaller}
          setAllowAnyCaller={setAllowAnyCaller}
          customRelay={customRelay}
          setCustomRelay={setCustomRelay}
          editRelay={editRelay}
          availableValues={availableValues}
        />

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

const SButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  paddingTop: '0.4rem',
  button: {
    width: '100%',
  },
});
