import { useEffect, useMemo, useState } from 'react';
import { Button, styled } from '@mui/material';
import { isAddress } from 'viem';

import { SSwitch, StyledInput, StyledText, Icon } from '~/components';
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

export const CallerSection = ({ callersList, setCallersList, isLoading, setIsError, isEdit }: CallerSectionProps) => {
  const { currentTheme } = useTheme();
  const { modalOpen } = useModal();
  const [callers, setCallers] = useState<string[]>([]);
  const [callerAddress, setCallerAddress] = useState<string>('');
  const [allowAnyCaller, setAllowAnyCaller] = useState(false);

  const callerIsRepeated = useMemo(() => {
    return !allowAnyCaller && callers.includes(callerAddress);
  }, [allowAnyCaller, callers, callerAddress]);

  const errorText = useMemo(
    () => (callerIsRepeated ? 'Caller address already added' : 'Invalid address'),
    [callerIsRepeated],
  );

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
    setCallersList(callersList.filter((c) => c !== caller));
    setCallers(callers.filter((c) => c !== caller));
  };

  const handleCallerAddressChange = (value: string) => {
    setCallerAddress(value);
    if (isAddress(value)) setCallersList(allowAnyCaller ? [anyCaller] : [value, ...callersList.slice(1)]);
    setIsError(false);
  };

  const handleRemoveCallerInput = () => {
    setCallersList(callersList.filter((c) => c !== callerAddress));

    if (callers.length > 0) {
      setCallerAddress(callers[0]);
      handleRemoveCaller(callers[0])();
    } else {
      setCallerAddress('');
    }
  };

  useEffect(() => {
    if (isEdit) {
      setCallerAddress(callersList[0]);
      setCallers(callersList.slice(1));
    }
  }, [isEdit, callersList]);

  useEffect(() => {
    if (allowAnyCaller) {
      setCallers([anyCaller]);
      setCallerAddress(anyCaller);
    }
  }, [allowAnyCaller, setCallers]);

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
      setCallers([]);
    }
  }, [modalOpen, setAllowAnyCaller, setCallerAddress, setCallers]);

  return (
    <InputsContainer>
      {/* Callers Input */}
      <InputLabel>Callers</InputLabel>

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

      <StyledInput
        value={callerAddress}
        setValue={handleCallerAddressChange}
        placeholder='Enter caller address'
        disabled={allowAnyCaller || isLoading}
        error={(!!callerAddress && !isAddress(callerAddress)) || callerIsRepeated}
        errorText={errorText}
        onClick={handleRemoveCallerInput}
        removable={!!callerAddress}
        dataTestId='relay-caller-input'
        sx={{ mt: '-1rem' }}
      />

      <CallersContainer>
        <TextButton
          variant='text'
          disabled={allowAnyCaller || !isAddress(callerAddress) || isLoading || callerIsRepeated}
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

const ButtonText = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    fontWeight: 500,
    color: currentTheme.actionButton,
    textTransform: 'none',
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
