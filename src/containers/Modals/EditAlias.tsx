import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { TitleContainer, SCloseIcon, ButtonsContainer } from '~/containers';
import {
  ActiveButton,
  CancelButton,
  StyledText,
  StyledTitle,
  OptionsMenuProps,
  SModal,
  StyledInput,
  CloseButton,
} from '~/components';

interface EditAliasModalProps extends OptionsMenuProps {
  close: () => void;
}

export const EditAliasModal = ({ type, value, close }: EditAliasModalProps) => {
  const [alias, setAlias] = useState<string>(`My Custom ${type}`);

  return (
    <BigModal>
      <SBox>
        <TitleContainer>
          <StyledTitle>Edit {type} Alias</StyledTitle>
          <CloseButton variant='text' onClick={close}>
            <SCloseIcon />
          </CloseButton>
        </TitleContainer>

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

const SBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  marginBottom: '2.4rem',
  width: '100%',
});

const InputContainer = styled(Box)({
  marginTop: '2.4rem',
  marginBottom: '4rem',
});

const Text = styled(StyledText)({
  textTransform: 'capitalize',
  span: {
    textTransform: 'none',
  },
});
