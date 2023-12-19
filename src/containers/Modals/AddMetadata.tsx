import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { TitleContainer, ButtonsContainer } from '~/containers';
import {
  ActiveButton,
  CancelButton,
  StyledTitle,
  StyledInput,
  CloseButton,
  BaseModal,
  Icon,
  StyledText,
} from '~/components';
import { useModal, useStateContext, useTheme, useXKeeperMetadata } from '~/hooks';
import { ModalType } from '~/types';
import { getConfig } from '~/config';

export const AddMetadataModal = () => {
  const { addresses } = getConfig();
  const { loading, selectedVault } = useStateContext();
  const { setModalOpen, modalOpen } = useModal();
  const { currentTheme } = useTheme();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const vaultAddress = selectedVault?.address || '0x';

  const { handleSendTransaction, writeAsync } = useXKeeperMetadata({
    contractAddress: addresses.xKeeperMetadata,
    args: [vaultAddress, { name, description }],
    notificationTitle: 'Metadata successfully added',
    showReceipt: true,
  });

  const handleConfirm = () => {
    handleSendTransaction();
    setDescription('');
  };

  return (
    <BaseModal open={modalOpen === ModalType.ADD_METADATA}>
      <BigModal>
        <SBox>
          <TitleContainer>
            <StyledTitle>Add Metadata</StyledTitle>

            <CloseButton variant='text' onClick={() => setModalOpen(ModalType.NONE)}>
              <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
            </CloseButton>
          </TitleContainer>

          <Text>Define your vault metadata for keepers to better understand your jobs</Text>
        </SBox>

        <StyledInput label='Name' value={name} setValue={setName} placeholder='Vault name' />

        <InputContainer>
          <StyledInput
            label='Description'
            value={description}
            setValue={setDescription}
            placeholder={`Short description and key urls`}
          />
        </InputContainer>

        <ButtonsContainer>
          <CancelButton variant='outlined' onClick={() => setModalOpen(ModalType.NONE)}>
            Cancel
          </CancelButton>

          <ActiveButton
            variant='contained'
            disabled={!writeAsync || loading || !description || !name}
            onClick={handleConfirm}
          >
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
  marginBottom: '4rem',
});

const Text = styled(StyledText)({
  span: {
    textTransform: 'none',
  },
});
