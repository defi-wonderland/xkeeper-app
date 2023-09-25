import { useState } from 'react';
import { Button, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { ActiveButton, BaseModal, CancelButton, SSwitch, StyledInput, StyledTitle, StyledText } from '~/components';
import { ButtonsContainer, BigModal } from '~/containers';
import { useStateContext } from '~/hooks';

interface RelayModalProps {
  children: React.ReactNode;
}

export const RelayModal = ({ children }: RelayModalProps) => {
  const [relayAddress, setRelayAddress] = useState('');
  const [callers, setCallers] = useState('');
  const [relayAlias, setRelayAlias] = useState('');
  const [allowAnyCaller, setAllowAnyCaller] = useState(false);

  const handleToggle = () => {
    setAllowAnyCaller(!allowAnyCaller);
    console.log(allowAnyCaller);
  };

  return (
    <BaseModal triggerButton={children}>
      <BigModal>
        <StyledTitle>Add New Relay</StyledTitle>

        <InputsContainer>
          <StyledInput
            label='Relay'
            description='Choose from trusted relays or enter a custom address.'
            value={relayAddress}
            setValue={setRelayAddress}
            placeholder='Choose Relay'
          />

          <StyledInput label='Callers' value={callers} setValue={setCallers} placeholder='Enter caller address' />

          <CallersContainer>
            <SButton variant='text'>
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
          <CancelButton variant='outlined' onClick={close}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained'>Confirm</ActiveButton>
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

const SButton = styled(Button)({
  width: '23rem',
  padding: 0,
  justifyContent: 'flex-start',
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
