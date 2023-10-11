import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { TitleContainer, ButtonsContainer } from '~/containers';
import {
  ActiveButton,
  CancelButton,
  StyledText,
  StyledTitle,
  StyledInput,
  CloseButton,
  BaseModal,
  Icon,
} from '~/components';
import { useStateContext } from '~/hooks';
import { ModalType } from '~/types';

export const EditAliasModal = () => {
  const { setModalOpen, modalOpen, currentTheme, selectedItem } = useStateContext();
  const [alias, setAlias] = useState<string>('');

  return (
    <BaseModal open={modalOpen === ModalType.EDIT_ALIAS}>
      <BigModal>
        <SBox>
          <TitleContainer>
            <StyledTitle>Edit {selectedItem.type} Alias</StyledTitle>

            <CloseButton variant='text' onClick={() => setModalOpen(ModalType.NONE)}>
              <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
            </CloseButton>
          </TitleContainer>

          <Text>
            {selectedItem.type} address: <span>{selectedItem.address}</span>
          </Text>
        </SBox>

        <InputContainer>
          <StyledInput
            label='Alias'
            value={alias}
            setValue={setAlias}
            description='This will only be visible to you.'
            placeholder={`My custom ${selectedItem.type}`}
          />
        </InputContainer>

        <ButtonsContainer>
          <CancelButton variant='outlined' onClick={() => setModalOpen(ModalType.NONE)}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained'>Confirm</ActiveButton>
        </ButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

const BigModal = styled(Box)({
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
