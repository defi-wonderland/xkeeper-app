import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { isAddress } from 'viem';

import {
  ActiveButton,
  BaseModal,
  CancelButton,
  CloseButton,
  InfoChip,
  StyledInput,
  StyledText,
  StyledTitle,
  Icon,
} from '~/components';
import { BigModal, TitleContainer as Header } from '~/containers';
import { useStateContext } from '~/hooks';
import { ModalType } from '~/types';

export const WithdrawtModal = () => {
  const { modalOpen, setModalOpen, setNotification, setLoading, currentTheme } = useStateContext();
  const handleClose = () => setModalOpen(ModalType.NONE);

  const [widthdrawalAddress, setWithdrawalAddress] = useState('');
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');

  // temporary
  const vaultName = 'Connext One';
  const network = 'Ethereum';

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // temporary log
      console.log('approving relay...');
      // if (writeAsync) {
      // const writeResult = await writeAsync();
      // await publicClient.waitForTransactionReceipt(writeResult);
      setModalOpen(ModalType.NONE);
      setNotification({
        open: true,
        title: 'Funds successfully withdrawn',
        message: 'View transaction',
      });
      // }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <BaseModal open={modalOpen === ModalType.WITHDRAW}>
      <BigModal>
        <TitleContainer>
          <Header>
            <StyledTitle>Withdraw Funds</StyledTitle>

            <CloseButton variant='text' onClick={handleClose}>
              <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
            </CloseButton>
          </Header>

          <InfoContainer>
            <VaultText>
              Vault: <span>{vaultName}</span>
            </VaultText>

            <Divider />

            <NetworkText>
              Network: <InfoChip>{network} (ERC-20)</InfoChip>
            </NetworkText>
          </InfoContainer>
        </TitleContainer>

        <StyledInput
          label='Withdrawal address'
          value={widthdrawalAddress}
          setValue={setWithdrawalAddress}
          error={!!widthdrawalAddress && !isAddress(widthdrawalAddress)}
          errorText='Invalid address'
        />

        <StyledInput label='Token' value={token} setValue={setToken} />

        <StyledInput
          label='Amount'
          value={amount}
          setValue={setAmount}
          description='Available: 12 ETH'
          placeholder='0'
        />

        <SButtonsContainer>
          <CancelButton variant='outlined' onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' onClick={handleConfirm}>
            Confirm
          </ActiveButton>
        </SButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

const TitleContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  justifyContent: 'space-between',
  marginBottom: '2.4rem',
});

const InfoContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.6rem',
});

const VaultText = styled(StyledText)(() => {
  return {
    span: {
      fontWeight: 500,
    },
  };
});

const NetworkText = styled(StyledText)(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.4rem',
  };
});

const Divider = styled('div')(() => {
  const { currentTheme } = useStateContext();
  return {
    width: '0.1rem',
    backgroundColor: currentTheme.backButtonBorderColor,
  };
});

const SButtonsContainer = styled(Box)({
  marginTop: '5.6rem',
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  button: {
    width: '100%',
  },
});
