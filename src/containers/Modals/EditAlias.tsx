import { useEffect, useMemo, useState } from 'react';
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
import { useAlias, useModal, useStateContext, useTheme } from '~/hooks';
import { ModalType } from '~/types';
import { aliasKey, saveLocalStorage } from '~/utils';

export const EditAliasModal = () => {
  const { selectedItem } = useStateContext();
  const { modalOpen, setModalOpen } = useModal();
  const { currentTheme } = useTheme();
  const { aliasData, updateAliasData } = useAlias();
  const [alias, setAlias] = useState<string>('');

  const { type, relayAddress, jobAddress, vaultAddress } = selectedItem || {};

  const selectedAddress = useMemo(() => {
    switch (type) {
      case 'caller':
        return relayAddress || '';
      case 'job':
        return jobAddress || '';
      case 'vault':
        return vaultAddress || '';
      default:
        return '';
    }
  }, [jobAddress, relayAddress, type, vaultAddress]);

  const handleConfirm = () => {
    aliasData[selectedAddress] = alias;
    saveLocalStorage(aliasKey, aliasData);
    updateAliasData();
    setAlias('');
    setModalOpen(ModalType.NONE);
  };

  useEffect(() => {
    setAlias(aliasData[selectedAddress] || '');
  }, [aliasData, selectedAddress]);

  return (
    <BaseModal open={modalOpen === ModalType.EDIT_ALIAS}>
      <BigModal>
        <SBox>
          <TitleContainer>
            <StyledTitle>Edit {type} Alias</StyledTitle>

            <CloseButton variant='text' onClick={() => setModalOpen(ModalType.NONE)}>
              <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
            </CloseButton>
          </TitleContainer>

          <Text>
            {type} address: <span>{selectedAddress}</span>
          </Text>
        </SBox>

        <InputContainer>
          <StyledInput
            dataTestId='edit-alias-input'
            label='Alias'
            value={alias}
            setValue={setAlias}
            description='This will only be visible to you.'
            placeholder={`My custom ${type}`}
            onKeyUp={handleConfirm}
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
          <ActiveButton variant='contained' onClick={handleConfirm} data-test='confirm-edit-alias-button'>
            Confirm
          </ActiveButton>
        </ButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

const BigModal = styled(Box)({
  width: '59.6rem',

  '@media (max-width: 600px)': {
    width: '100%',
  },
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
    wordBreak: 'break-all',
  },
});
