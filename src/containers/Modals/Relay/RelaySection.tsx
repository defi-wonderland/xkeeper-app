import { Button, styled } from '@mui/material';
import { useMemo } from 'react';
import { isAddress } from 'viem';

import { SSwitch, StyledInput, StyledText, Icon, RelayDropdown } from '~/components';
import { DropdownContainer, DropdownLabel } from '~/containers';
import { useTheme } from '~/hooks';
import { getRelayName } from '~/utils';

interface RelaySectionProps {
  isLoading: boolean;
  relayAddress: string;
  setRelayAddress: (value: string) => void;
  callerAddress: string;
  setCallerAddress: (value: string) => void;
  callers: string[];
  setCallers: (value: string[]) => void;
  allowAnyCaller: boolean;
  setAllowAnyCaller: (value: boolean) => void;
  customRelay: boolean;
  setCustomRelay: (value: boolean) => void;

  editRelay: boolean;
  availableValues: string[];
}

export const RelaySection = ({
  isLoading,
  relayAddress,
  setRelayAddress,
  callerAddress,
  setCallerAddress,
  callers,
  setCallers,
  allowAnyCaller,
  setAllowAnyCaller,
  customRelay,
  setCustomRelay,
  editRelay,
  availableValues,
}: RelaySectionProps) => {
  const { currentTheme } = useTheme();

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

  return (
    <>
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
    </>
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
