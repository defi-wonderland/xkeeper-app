import { useEffect, useMemo, useState } from 'react';
import { Button, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Address, useContractWrite, usePrepareContractWrite } from 'wagmi';
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
} from '~/components';
import { ButtonsContainer, BigModal, TitleContainer, SCloseIcon } from '~/containers';
import { useStateContext } from '~/hooks';
import { vaultABI } from '~/generated';
import { ModalType } from '~/types';
import { anyCaller } from '~/utils';

export const RelayModal = () => {
  const { modalOpen, setModalOpen, selectedVault } = useStateContext();
  const handleClose = () => setModalOpen(ModalType.NONE);

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

  const { isLoading, write } = useContractWrite(config);

  const handleToggle = () => {
    setAllowAnyCaller(!allowAnyCaller);
  };

  const handleApproveRelay = () => {
    // temporary log
    console.log('approving relay...');
    if (write) {
      write();
    }
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
            <SCloseIcon />
          </CloseButton>
        </TitleContainer>

        <InputsContainer>
          <StyledInput
            label='Relay'
            description='Choose from trusted relays or enter a custom address.'
            value={relayAddress}
            setValue={setRelayAddress}
            placeholder='Choose Relay'
          />

          <StyledInput
            label='Callers'
            value={callerAddress}
            setValue={setCallerAddress}
            placeholder='Enter caller address'
            disabled={allowAnyCaller}
          />

          {callers.map((caller) => (
            <>
              {!allowAnyCaller && (
                <StyledInput sx={{ mt: '-1rem' }} key={caller} value={caller} setValue={() => {}} disabled />
              )}
            </>
          ))}

          <CallersContainer>
            <SButton variant='text' disabled={allowAnyCaller || !isAddress(callerAddress)} onClick={handleAddNewCaller}>
              <Container>
                <AddIcon />
                <ButtonText>Add additional caller address</ButtonText>
              </Container>
            </SButton>

            <Container>
              <SSwitch onClick={handleToggle} />
              <ToggleText>Allow any caller</ToggleText>
            </Container>
          </CallersContainer>

          <StyledInput
            label='Relay name/alias'
            description='This will only be visible to you.'
            value={relayAlias}
            setValue={setRelayAlias}
            placeholder='My Custom Relay'
          />
        </InputsContainer>

        <ButtonsContainer>
          <CancelButton variant='outlined' onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' disabled={!write || isLoading} onClick={handleApproveRelay}>
            Confirm
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
  gap: '0.8rem',
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
