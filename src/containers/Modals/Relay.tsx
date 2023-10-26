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
import { ModalType } from '~/types';
import { getConfig } from '~/config';

export const RelayModal = () => {
  const { modalOpen, selectedVault, loading, currentTheme, selectedItem, setModalOpen } = useStateContext();
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

  const availableValues = useMemo(() => [...Object.values(relays), 'Custom Relay'], [relays]);

  const { handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'approveRelayCallers',
    args: [relayAddress, callerList],
    notificationTitle: 'Relay successfuly approved',
    notificationMessage: getReceiptMessage(relayAddress, 'relay is now enabled'),
  });

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

  useEffect(() => {
    if (allowAnyCaller) {
      setCallers([anyCaller]);
      setCallerAddress(anyCaller);
    }
  }, [allowAnyCaller]);

  useEffect(() => {
    if (!allowAnyCaller) {
      if (selectedItem.params) {
        setCallerAddress(selectedItem.params[0]);
        setCallers(selectedItem.params.slice(1));
      }
    }
  }, [selectedItem, allowAnyCaller, editRelay]);

  useEffect(() => {
    setRelayAddress(editRelay ? selectedItem.address : '');
  }, [selectedItem, editRelay]);

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

          {!customRelay && (
            <DropdownContainer>
              <DropdownLabel>Relay</DropdownLabel>
              <RelayDropdown
                value={getRelayName(relayAddress, 'Choose Relay')}
                setValue={setRelayAddress}
                availableValues={availableValues}
                disabled={loading || editRelay}
                setCustomRelay={setCustomRelay}
              />
            </DropdownContainer>
          )}

          {customRelay && (
            <StyledInput
              label='Relay'
              value={relayAddress}
              setValue={setRelayAddress}
              placeholder='Enter relay address'
              disabled={loading}
              error={!!relayAddress && !isAddress(relayAddress)}
              errorText='Invalid address'
              isAutoFocus
              removable
              onClick={() => {
                setCustomRelay(!customRelay);
              }}
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
            disabled={allowAnyCaller || loading}
            error={!!callerAddress && !isAddress(callerAddress)}
            errorText='Invalid address'
            onClick={handleRemoveCallerInput}
            onKeyUp={handleSendTransaction}
            removable={!!callerAddress}
          />

          {!allowAnyCaller &&
            callers.map((caller) => (
              <StyledInput
                sx={{ mt: '-1rem' }}
                key={caller}
                value={caller}
                setValue={() => {}}
                onClick={handleRemoveCaller(caller)}
                removable
              />
            ))}

          <CallersContainer>
            <TextButton
              variant='text'
              disabled={allowAnyCaller || !isAddress(callerAddress) || loading}
              onClick={handleAddNewCaller}
            >
              <Container>
                <Icon name='plus' size='2rem' color={currentTheme.actionButton} />
                <ButtonText>Add additional caller address</ButtonText>
              </Container>
            </TextButton>

            <Container>
              <SSwitch disabled={loading} onClick={handleToggle} />
              <ToggleText>Allow any caller</ToggleText>
            </Container>
          </CallersContainer>
        </InputsContainer>

        <SButtonsContainer>
          <CancelButton variant='outlined' disabled={loading} onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' disabled={!writeAsync || loading} onClick={handleSendTransaction}>
            <ConfirmText isLoading={loading} />
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
