import { useEffect, useMemo, useState } from 'react';
import { Button, styled } from '@mui/material';
import { isAddress } from 'viem';

import { SSwitch, StyledInput, StyledText } from '~/components';
import { useModal, useTheme } from '~/hooks';
import { anyCaller } from '~/utils';
import { ModalType } from '~/types';

interface CallerSectionProps {
  callersList: string[];
  setCallersList: (value: string[]) => void;
  isLoading: boolean;
  isError: boolean;
  setIsError: (value: boolean) => void;
  isEdit: boolean;
}

export const CallerSection = ({ callersList, setCallersList, isLoading, setIsError }: CallerSectionProps) => {
  const { modalOpen } = useModal();
  const [callerAddress, setCallerAddress] = useState<string>('');
  const [allowAnyCaller, setAllowAnyCaller] = useState(false);

  const callerIsRepeated = useMemo(() => {
    return !allowAnyCaller && callersList.includes(callerAddress);
  }, [allowAnyCaller, callersList, callerAddress]);

  const errorText = useMemo(
    () => (callerIsRepeated ? 'Caller address already added' : 'Invalid address'),
    [callerIsRepeated],
  );

  const handleToggle = () => {
    const newValue = !allowAnyCaller;
    if (newValue) {
      setCallersList([anyCaller]);
      setCallerAddress(anyCaller);
    } else {
      setCallersList([]);
      setCallerAddress('');
    }
    setAllowAnyCaller(newValue);
  };

  const handleAddNewCaller = () => {
    if (isAddress(callerAddress)) {
      setCallersList([...callersList, callerAddress]);
      setCallerAddress('');
    }
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

      {!allowAnyCaller && !!callersList.length && (
        <>
          {!!callersList.length && <InputLabel>Callers list</InputLabel>}
          {callersList.map((caller) => (
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
        </>
      )}

      <InputLabel>New Caller</InputLabel>
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
          <SSwitch disabled={isLoading} onClick={handleToggle} />
          <ToggleText>Allow any caller</ToggleText>
        </Container>
      </CallersContainer>
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
