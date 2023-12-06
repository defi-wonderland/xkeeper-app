import { useEffect, useMemo, useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { isAddress } from 'viem';

import {
  ActiveButton,
  BaseModal,
  CancelButton,
  SSwitch,
  StyledInput,
  StyledTitle,
  StyledText,
  CloseButton,
  Icon,
  RelayDropdown,
  ConfirmText,
} from '~/components';
import { BigModal, TitleContainer, DropdownContainer, DropdownLabel } from '~/containers';
import { anyCaller, getReceiptMessage, getRelayName } from '~/utils';
import { useStateContext, useVault } from '~/hooks';
import { ModalType, Status } from '~/types';
import { getConfig } from '~/config';

export const RelayModal = () => {
  const { modalOpen, selectedVault, currentTheme, selectedItem, setModalOpen } = useStateContext();
  const handleClose = () => setModalOpen(ModalType.NONE);
  const {
    addresses: { relays },
  } = getConfig();

  const [relayAddress, setRelayAddress] = useState<string>('');
  const [callerAddress, setCallerAddress] = useState<string>('');
  const [callers, setCallers] = useState<string[]>([]);
  const [allowAnyCaller, setAllowAnyCaller] = useState(false);
  const [customRelay, setCustomRelay] = useState(false);

  const callerList = useMemo(() => {
    if (allowAnyCaller) {
      return [anyCaller];
    } else {
      return [callerAddress, ...callers];
    }
  }, [allowAnyCaller, callerAddress, callers]);

  const editRelay = useMemo(() => {
    return isAddress(selectedItem.address);
  }, [selectedItem]);

  const availableValues = useMemo(() => [...Object.values(relays), 'Choose Relay'], [relays]);

  const { requestStatus, handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'approveRelayCallers',
    args: [relayAddress, callerList],
    notificationTitle: 'Relay successfuly approved',
    notificationMessage: getReceiptMessage(relayAddress, 'relay is now enabled'),
  });
  const isLoading = requestStatus === Status.LOADING;

  const handleToggle = () => {
    setCallers([]);
    setCallerAddress('');
    setAllowAnyCaller(!allowAnyCaller);
  };

  const handleAddNewCaller = () => {
    if (isAddress(callerAddress)) {
      setCallers([callerAddress, ...callers]);
      setCallerAddress('');
    }
  };

  const handleRemoveCaller = (caller: string) => () => {
    setCallers(callers.filter((c) => c !== caller));
  };

  const handleRemoveCallerInput = () => {
    if (callers.length > 0) {
      setCallerAddress(callers[0]);
      handleRemoveCaller(callers[0])();
    } else {
      setCallerAddress('');
    }
  };

  const handleCustomRelayAddress = () => {
    setRelayAddress('');
    setCustomRelay(!customRelay);
  };

  useEffect(() => {
    if (allowAnyCaller) {
      setCallers([anyCaller]);
      setCallerAddress(anyCaller);
    }
  }, [allowAnyCaller]);

  useEffect(() => {
    setCustomRelay(false);
    setRelayAddress(editRelay ? selectedItem.address : '');
  }, [selectedItem, editRelay]);

  useEffect(() => {
    setCallerAddress('');
  }, [modalOpen]);

  const callerIsRepeated = useMemo(() => {
    return callers.includes(callerAddress);
  }, [callers, callerAddress]);

  const errorText = useMemo(
    () => (callerIsRepeated ? 'Caller address already added' : 'Invalid address'),
    [callerIsRepeated],
  );

  const dropdownValue = useMemo(
    () => getRelayName(relayAddress, editRelay ? 'Custom Relay' : 'Choose Relay'),
    [editRelay, relayAddress],
  );

  return (
    <BaseModal open={modalOpen === ModalType.ADD_RELAY}>
      <BigModal>
        <TitleContainer>
          <StyledTitle>Add New Relay</StyledTitle>

          <CloseButton variant='text' onClick={handleClose}>
            <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
          </CloseButton>
        </TitleContainer>

        <InputsContainer>
          {/* Relay Input */}

          <DropdownContainer>
            <DropdownLabel>Relay</DropdownLabel>
            <RelayDropdown
              value={dropdownValue}
              setValue={setRelayAddress}
              availableValues={availableValues}
              disabled={isLoading || editRelay}
              setCustomRelay={setCustomRelay}
              customRelay={customRelay}
            />
          </DropdownContainer>

          {customRelay && (
            <StyledInput
              value={relayAddress}
              setValue={setRelayAddress}
              placeholder='Enter relay address'
              disabled={isLoading}
              error={!!relayAddress && !isAddress(relayAddress)}
              errorText='Invalid address'
              isAutoFocus
              removable
              onClick={handleCustomRelayAddress}
              sx={{ mt: '-1rem' }}
            />
          )}

          {isAddress(relayAddress) && !customRelay && (
            <StyledInput sx={{ mt: '-1rem' }} value={relayAddress} setValue={() => {}} onClick={() => {}} copyable />
          )}

          {/* Callers Input */}
          <StyledInput
            label='Callers'
            value={callerAddress}
            setValue={setCallerAddress}
            placeholder='Enter caller address'
            disabled={allowAnyCaller || isLoading}
            error={(!!callerAddress && !isAddress(callerAddress)) || callerIsRepeated}
            errorText={errorText}
            onClick={handleRemoveCallerInput}
            onKeyUp={handleSendTransaction}
            removable={!!callerAddress}
            dataTestId='relay-caller-input'
          />

          {!allowAnyCaller &&
            callers.map((caller) => (
              <StyledInput
                sx={{ mt: '-1rem' }}
                key={caller}
                value={caller}
                setValue={() => {}}
                onClick={handleRemoveCaller(caller)}
                disabled={allowAnyCaller || isLoading}
                removable
              />
            ))}

          <CallersContainer>
            <TextButton
              variant='text'
              disabled={allowAnyCaller || !isAddress(callerAddress) || isLoading}
              onClick={handleAddNewCaller}
            >
              <Container>
                <Icon name='plus' size='2rem' color={currentTheme.actionButton} />
                <ButtonText>Add additional caller address</ButtonText>
              </Container>
            </TextButton>

            <Container>
              <SSwitch disabled={isLoading} onClick={handleToggle} />
              <ToggleText>Allow any caller</ToggleText>
            </Container>
          </CallersContainer>
        </InputsContainer>

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

const InputsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  margin: '2.4rem 0 1.6rem 0',
});

const CallersContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '-1.2rem',
  marginBottom: '2.4rem',
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.6rem',
  alignItems: 'center',
  width: 'fit-content',
});

export const TextButton = styled(Button)(() => {
  const { currentTheme } = useStateContext();
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

const ToggleText = styled(StyledText)(() => {
  const { currentTheme } = useStateContext();
  return {
    fontWeight: 500,
    color: currentTheme.textTertiary,
  };
});

const ButtonText = styled(StyledText)(() => {
  const { currentTheme } = useStateContext();
  return {
    fontWeight: 500,
    color: currentTheme.actionButton,
    textTransform: 'none',
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
