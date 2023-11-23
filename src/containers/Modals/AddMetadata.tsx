import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { TitleContainer, ButtonsContainer } from '~/containers';
import { ActiveButton, CancelButton, StyledTitle, StyledInput, CloseButton, BaseModal, Icon } from '~/components';
import { useStateContext, useXKeeperMetadata } from '~/hooks';
import { ModalType } from '~/types';
import { getConfig } from '~/config';

export const AddMetadataModal = () => {
  const { setModalOpen, modalOpen, currentTheme, loading } = useStateContext();
  const [description, setDescription] = useState<string>('');
  const {
    addresses: { xKeeperMetadata },
  } = getConfig();

  const { handleSendTransaction, writeAsync } = useXKeeperMetadata({
    contractAddress: xKeeperMetadata,
    functionName: 'setAutomationVaultMetadata',
    args: description,
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
        </SBox>

        <InputContainer>
          <StyledInput
            label='Description'
            value={description}
            setValue={setDescription}
            placeholder={`Short description and key urls`}
            onKeyUp={handleConfirm}
          />
        </InputContainer>

        <ButtonsContainer>
          <CancelButton variant='outlined' onClick={() => setModalOpen(ModalType.NONE)}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' disabled={!writeAsync || loading || !description} onClick={handleConfirm}>
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
