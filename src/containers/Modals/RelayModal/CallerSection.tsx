import { useEffect, useMemo, useState } from 'react';
import { Button, styled } from '@mui/material';
import { isAddress } from 'viem';

import { SSwitch, StyledInput, StyledText } from '~/components';
import { useModal, useStateContext, useTheme } from '~/hooks';
import { anyCaller } from '~/utils';
import { ModalType } from '~/types';

interface CallerSectionProps {
  relayAddress: string;
  callersList: string[];
  setCallersList: (value: string[]) => void;
  isLoading: boolean;
  isError: boolean;
  setIsError: (value: boolean) => void;
  isEdit: boolean;
}

export const CallerSection = ({
  relayAddress,
  callersList,
  setCallersList,
  isLoading,
  setIsError,
}: CallerSectionProps) => {
  const { selectedVault, selectedItem, addresses, currentNetwork } = useStateContext();
  const { modalOpen } = useModal();
  const [callerAddress, setCallerAddress] = useState<string>('');
  const [allowAnyCaller, setAllowAnyCaller] = useState(false);

  /**
   *  If the relay address is the GelatoRelay, we disable the allowAnyCaller switch
   *  This is because the GelatoRelay has a special exec function that requires fee data
   *  and we don't want to allow any caller to call this function
   */
  const allowAnyCallerDisabled = useMemo(
    () => addresses[currentNetwork.id].relays.GelatoRelay === relayAddress,
    [addresses, currentNetwork.id, relayAddress],
  );

  const callerIsRepeated = useMemo(() => {
    return !allowAnyCaller && callersList.includes(callerAddress);
  }, [allowAnyCaller, callersList, callerAddress]);

  const errorText = useMemo(
    () => (callerIsRepeated ? 'Caller address already added' : 'Invalid address'),
    [callerIsRepeated],
  );

  const handleToggle = () => {
    if (!allowAnyCaller) {
      setCallersList([anyCaller]);
      setCallerAddress(anyCaller);
    } else {
      const relays = Object.entries(selectedVault?.relays || {});
      const selectedRelay = relays.find((relay) => relay[0] === selectedItem?.selectedAddress);
      setCallersList(selectedRelay ? selectedRelay[1].callers : []);
      setCallerAddress('');
    }
    setAllowAnyCaller(!allowAnyCaller);
  };

  const handleAddNewCaller = () => {
    setCallersList([...callersList, callerAddress]);
    setCallerAddress('');
    setIsError(false);
  };

  const handleRemoveCaller = (caller: string) => () => {
    setCallersList(callersList.filter((c) => c !== caller));
  };

  useEffect(() => {
    if ((!!callerAddress && !isAddress(callerAddress)) || callerIsRepeated) {
      setIsError(true);
    }
  }, [callerAddress, callerIsRepeated, setIsError]);

  // Reset values when modal is closed
  useEffect(() => {
    if (modalOpen === ModalType.NONE) {
      setCallerAddress('');
      setAllowAnyCaller(false);
    }
  }, [modalOpen, setAllowAnyCaller, setCallerAddress]);

  return (
    <InputsContainer>
      {/* Callers Input */}

      <InputLabel>New caller</InputLabel>
      <StyledInput
        value={callerAddress}
        setValue={setCallerAddress}
        placeholder='Enter caller address'
        disabled={allowAnyCaller || isLoading}
        error={(!!callerAddress && !isAddress(callerAddress)) || callerIsRepeated}
        errorText={errorText}
        onClick={handleAddNewCaller}
        dataTestId='relay-caller-input'
        sx={{ mt: '-1rem' }}
        addable={!!callerAddress && !allowAnyCaller}
      />
      <CallersContainer>
        <Container>
          <SSwitch disabled={allowAnyCallerDisabled || isLoading} onClick={handleToggle} />
          <ToggleText>Allow any caller</ToggleText>
        </Container>
      </CallersContainer>

      {!allowAnyCaller && !!callersList.length && (
        <>
          {!!callersList.length && <InputLabel>Callers list</InputLabel>}
          {callersList.map((caller) => (
            <StyledInput
              sx={{ mt: '-1rem' }}
              key={caller}
              value={caller}
              onClick={handleRemoveCaller(caller)}
              disabled={allowAnyCaller || isLoading}
              removable
            />
          ))}
        </>
      )}
    </InputsContainer>
  );
};

const InputsContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
});

const CallersContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '-1.2rem',
  marginBottom: '2.4rem',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.2rem',
  },
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '0.6rem',
  alignItems: 'center',
  width: 'fit-content',
});

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

const ToggleText = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    fontWeight: 500,
    color: currentTheme.textTertiary,
  };
});

export const InputLabel = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    cursor: 'default',
    marginBottom: '1.6rem',
    marginRight: 'auto',
  };
});
