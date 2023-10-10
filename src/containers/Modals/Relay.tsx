import { useEffect, useMemo, useState } from 'react';
import { Button, styled } from '@mui/material';
import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
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
} from '~/components';
import { ButtonsContainer, BigModal, TitleContainer } from '~/containers';
import { useStateContext } from '~/hooks';
import { vaultABI } from '~/generated';
import { ModalType } from '~/types';
import { anyCaller } from '~/utils';

export const RelayModal = () => {
  const { modalOpen, setModalOpen, selectedVault, setNotification, loading, setLoading, currentTheme } =
    useStateContext();
  const handleClose = () => setModalOpen(ModalType.NONE);
  const publicClient = usePublicClient();

  const [relayAddress, setRelayAddress] = useState('');
  const [callerAddress, setCallerAddress] = useState<string>('');
  const [callers, setCallers] = useState<string[]>([]);
  const [relayAlias, setRelayAlias] = useState('');
  const [allowAnyCaller, setAllowAnyCaller] = useState(false);

  const callerList = useMemo(() => {
    if (allowAnyCaller) {
      return [anyCaller];
    } else {
      return [callerAddress, ...callers];
    }
  }, [allowAnyCaller, callerAddress, callers]);

  const { config } = usePrepareContractWrite({
    address: selectedVault?.address,
    abi: vaultABI,
    functionName: 'approveRelayCallers',
    args: [relayAddress as Address, callerList as Address[]],
  });

  const { writeAsync } = useContractWrite(config);

  const handleToggle = () => {
    setAllowAnyCaller(!allowAnyCaller);
  };

  const handleApproveRelay = async () => {
    setLoading(true);
    try {
      // temporary log
      console.log('approving relay...');
      if (writeAsync) {
        const writeResult = await writeAsync();
        await publicClient.waitForTransactionReceipt(writeResult);
        setModalOpen(ModalType.NONE);
        setNotification({
          open: true,
          title: `Relay successfuly approved`,
          message: (
            <>
              <span>{relayAddress}</span> relay is now enabled.
            </>
          ),
          type: '',
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleAddNewCaller = () => {
    if (isAddress(callerAddress)) {
      setCallers([...callers, callerAddress]);
      setCallerAddress('');
    }
  };

  useEffect(() => {
    if (allowAnyCaller) {
      setCallers([anyCaller]);
      setCallerAddress(anyCaller);
    } else {
      setCallers([]);
      setCallerAddress('');
    }
  }, [allowAnyCaller]);

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
          <StyledInput
            label='Relay'
            description='Choose from trusted relays or enter a custom address.'
            value={relayAddress}
            setValue={setRelayAddress}
            disabled={loading}
            placeholder='Choose Relay'
            error={!!relayAddress && !isAddress(relayAddress)}
            errorText='Invalid address'
          />

          <StyledInput
            label='Callers'
            value={callerAddress}
            setValue={setCallerAddress}
            placeholder='Enter caller address'
            disabled={allowAnyCaller || loading}
            error={!!callerAddress && !isAddress(callerAddress)}
            errorText='Invalid address'
          />

          {callers.map((caller) => (
            <>
              {!allowAnyCaller && (
                <StyledInput sx={{ mt: '-1rem' }} key={caller} value={caller} setValue={() => {}} disabled />
              )}
            </>
          ))}

          <CallersContainer>
            <SButton
              variant='text'
              disabled={allowAnyCaller || !isAddress(callerAddress) || loading}
              onClick={handleAddNewCaller}
            >
              <Container>
                <Icon name='plus' size='2rem' color={currentTheme.actionButton} />
                <ButtonText>Add additional caller address</ButtonText>
              </Container>
            </SButton>

            <Container>
              <SSwitch disabled={loading} onClick={handleToggle} />
              <ToggleText>Allow any caller</ToggleText>
            </Container>
          </CallersContainer>

          <StyledInput
            label='Relay name/alias'
            description='This will only be visible to you.'
            value={relayAlias}
            setValue={setRelayAlias}
            placeholder='My Custom Relay'
            disabled={loading}
          />
        </InputsContainer>

        <ButtonsContainer>
          <CancelButton variant='outlined' disabled={loading} onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' disabled={!writeAsync || loading} onClick={handleApproveRelay}>
            {!loading && 'Confirm'}
            {loading && 'Loading...'}
          </ActiveButton>
        </ButtonsContainer>
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

const SButton = styled(Button)(() => {
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
