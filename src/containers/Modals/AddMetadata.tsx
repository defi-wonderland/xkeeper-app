import { useEffect, useState } from 'react';
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
  ConfirmText,
} from '~/components';
import { useModal, useStateContext, useTheme, useXKeeperMetadata } from '~/hooks';
import { ModalType, Status } from '~/types';
import { getConfig } from '~/config';

export const AddMetadataModal = () => {
  const { addresses } = getConfig();
  const { selectedVault, currentNetwork } = useStateContext();
  const { modalOpen, closeModal } = useModal();
  const { currentTheme } = useTheme();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const vaultAddress = selectedVault?.address || '0x';
  const isEditMetadata = !!selectedVault?.name || !!selectedVault?.description;

  const { handleSendTransaction, writeAsync, requestStatus } = useXKeeperMetadata({
    contractAddress: addresses[currentNetwork?.id].xKeeperMetadata,
    args: [vaultAddress, { name, description }],
    notificationTitle: 'Metadata successfully added',
    showReceipt: true,
  });

  const isLoading = requestStatus === Status.LOADING;

  const handleConfirm = () => {
    handleSendTransaction();
  };

  useEffect(() => {
    if (selectedVault?.name || selectedVault?.description) {
      setName(selectedVault?.name || '');
      setDescription(selectedVault?.description || '');
    }
  }, [selectedVault?.description, selectedVault?.name]);

  return (
    <BaseModal open={modalOpen === ModalType.ADD_METADATA}>
      <BigModal data-test='add-metadata-modal'>
        <SBox>
          <TitleContainer>
            <StyledTitle>{isEditMetadata ? 'Edit' : 'Add'} Metadata</StyledTitle>

            <CloseButton variant='text' onClick={closeModal}>
              <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
            </CloseButton>
          </TitleContainer>

          <Text>Define your vault metadata for keepers to better understand your jobs</Text>
        </SBox>

        <StyledInput
          label='Name'
          value={name}
          setValue={setName}
          disabled={isLoading}
          placeholder='Vault name'
          dataTestId='name-metadata-input'
        />

        <InputContainer>
          <StyledInput
            label='Description'
            value={description}
            disabled={isLoading}
            setValue={setDescription}
            placeholder='Short description and key urls'
            dataTestId='description-metadata-input'
          />
        </InputContainer>

        <ButtonsContainer>
          <CancelButton variant='outlined' onClick={closeModal} disabled={isLoading}>
            Cancel
          </CancelButton>

          <ActiveButton
            variant='contained'
            disabled={!writeAsync || isLoading || !description || !name}
            onClick={handleConfirm}
            data-test='confirm-add-metadata-button'
          >
            <ConfirmText isLoading={isLoading} />
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
  marginBottom: '4rem',
});

const Text = styled(StyledText)({
  span: {
    textTransform: 'none',
  },
});
