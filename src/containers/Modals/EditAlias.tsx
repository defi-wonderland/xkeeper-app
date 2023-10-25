import { useEffect, useState } from 'react';
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
import { aliasKey, saveLocalStorage } from '~/utils';

export const EditAliasModal = () => {
  const { setModalOpen, modalOpen, currentTheme, selectedItem, aliasData, updateAliasData } = useStateContext();
  const [alias, setAlias] = useState<string>('');

  const handleConfirm = () => {
    aliasData[selectedItem.address] = alias;
    saveLocalStorage(aliasKey, aliasData);
    updateAliasData();
    setAlias('');
    setModalOpen(ModalType.NONE);
  };

  useEffect(() => {
    setAlias(aliasData[selectedItem.address] || '');
  }, [aliasData, selectedItem.address]);

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

          {/* 
              If the user clicks confirm with the input field empty, 
              the alias will be removed and the default name will be displayed.
          */}
          <ActiveButton variant='contained' onClick={handleConfirm}>
            Confirm
          </ActiveButton>
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
