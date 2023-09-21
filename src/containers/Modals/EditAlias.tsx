import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { ActiveButton, CancelButton, ModalText, ModalTitle, OptionsMenuProps, SModal, StyledInput } from '~/components';
import { ButtonsContainer, SBox } from './Revoke';

interface EditAliasModalProps extends OptionsMenuProps {
  close: () => void;
}

export const EditAliasModal = ({ type, value, close }: EditAliasModalProps) => {
  const [alias, setAlias] = useState<string>(`My Custom ${type}`);

  return (
    <BigModal>
      <SBox>
        <ModalTitle>Edit {type} Alias</ModalTitle>
        <Text>
          {type} address: <span>{value}</span>
        </Text>
      </SBox>

      <InputContainer>
        <StyledInput label='Alias' value={alias} setValue={setAlias} description='This will only be visible to you.' />
      </InputContainer>

      <ButtonsContainer>
        <CancelButton variant='outlined' onClick={close}>
          Cancel
        </CancelButton>

        <ActiveButton variant='contained'>Confirm</ActiveButton>
      </ButtonsContainer>
    </BigModal>
  );
};

const BigModal = styled(SModal)({
  width: '59.6rem',
});

const InputContainer = styled(Box)({
  marginTop: '2.4rem',
  marginBottom: '4rem',
});

const Text = styled(ModalText)({
  textTransform: 'capitalize',
  span: {
    textTransform: 'none',
  },
});
