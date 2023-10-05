import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { TitleContainer, SCloseIcon, ButtonsContainer } from '~/containers';
import { ActiveButton, CancelButton, StyledText, StyledTitle, StyledInput, CloseButton, BaseModal } from '~/components';
import { useStateContext } from '~/hooks';
import { ModalType } from '~/types';

export const EditAliasModal = () => {
  // temporary
  const type = 'relay';
  const value = '0x1234567890123456789012345678901234567890';
  const { setModalOpen, modalOpen } = useStateContext();
  const [alias, setAlias] = useState<string>(`My Custom ${type}`);

  return (
    <BaseModal open={modalOpen === ModalType.EDIT_ALIAS}>
      <BigModal>
        <SBox>
          <TitleContainer>
            <StyledTitle>Edit {type} Alias</StyledTitle>
            <CloseButton variant='text' onClick={() => setModalOpen(ModalType.NONE)}>
              <SCloseIcon />
            </CloseButton>
          </TitleContainer>

          <Text>
            {type} address: <span>{value}</span>
          </Text>
        </SBox>

        <InputContainer>
          <StyledInput
            label='Alias'
            value={alias}
            setValue={setAlias}
            description='This will only be visible to you.'
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
