import { useEffect, useMemo, useState } from 'react';
import { Box, styled } from '@mui/material';
import { Address, isAddress, parseUnits } from 'viem';

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
  TokenDropdown,
  ConfirmText,
} from '~/components';
import { BigModal, TitleContainer as Header } from '~/containers';
import { useStateContext, useVault, useTheme, useModal } from '~/hooks';
import { ModalType, Status, TokenData } from '~/types';
import { truncateAddress } from '~/utils';

export const WithdrawtModal = () => {
  const { selectedVault, currentNetwork, userAddress } = useStateContext();
  const { modalOpen, closeModal } = useModal();
  const { currentTheme } = useTheme();

  const [widthdrawalAddress, setWithdrawalAddress] = useState(userAddress || '');
  const [token, setToken] = useState<TokenData>({} as TokenData);
  const [amount, setAmount] = useState('');

  const vaultName = selectedVault?.name || truncateAddress(selectedVault?.address);
  const network = currentNetwork.displayName;

  const amountE18 = useMemo(() => {
    try {
      return parseUnits(amount, token.decimals);
    } catch (error) {
      return BigInt('0');
    }
  }, [amount, token?.decimals]);

  const handleMax = () => {
    setAmount(token.balance);
  };

  const { handleSendTransaction, writeAsync, requestStatus } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'withdrawFunds',
    args: [token.address as Address, amountE18, widthdrawalAddress as Address],
    notificationTitle: 'Funds successfully withdrawn',
    showReceipt: true,
  });

  const isLoading = requestStatus === Status.LOADING;

  useEffect(() => {
    if (userAddress) {
      setWithdrawalAddress(userAddress);
    }
  }, [userAddress]);

  useEffect(() => {
    if (selectedVault) {
      setToken(selectedVault.tokens[0]);
    }
  }, [selectedVault]);

  useEffect(() => {
    setAmount('');
  }, [token]);

  const AmountFieldDescription = (
    <>
      Available:{' '}
      <span>
        {token.balance} {token.symbol}
      </span>
    </>
  );

  return (
    <BaseModal open={modalOpen === ModalType.WITHDRAW}>
      <BigModal>
        <TitleContainer>
          <Header>
            <StyledTitle>Withdraw Funds</StyledTitle>

            <CloseButton variant='text' onClick={closeModal}>
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

        {/* Withdrawal address */}
        <StyledInput
          label='Withdrawal address'
          value={widthdrawalAddress}
          setValue={setWithdrawalAddress}
          error={!!widthdrawalAddress && !isAddress(widthdrawalAddress)}
          errorText='Invalid address'
          disabled={isLoading}
        />

        {/* Token selector  */}
        <InputContainer>
          <InputLabel>Token</InputLabel>
          <TokenDropdown tokens={selectedVault?.tokens} value={token} setValue={setToken} disabled={isLoading} />
        </InputContainer>

        {/* Amount field */}
        <StyledInput
          label='Amount'
          value={amount}
          setValue={setAmount}
          placeholder='0'
          number
          description={AmountFieldDescription}
          onClick={handleMax}
          tokenSymbol={token.symbol}
          disabled={isLoading}
        />

        <SButtonsContainer>
          <CancelButton variant='outlined' disabled={isLoading} onClick={closeModal}>
            Cancel
          </CancelButton>

          <ActiveButton
            variant='contained'
            disabled={!writeAsync || isLoading || !Number(amount)}
            onClick={handleSendTransaction}
          >
            <ConfirmText isLoading={isLoading} />
          </ActiveButton>
        </SButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

const InputLabel = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
  };
});

const InputContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
});

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

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.4rem',
  },
});

const VaultText = styled(StyledText)(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.4rem',
    span: {
      fontWeight: 500,
    },
  };
});

const NetworkText = styled(StyledText)(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.4rem',
  };
});

const Divider = styled('div')(() => {
  const { currentTheme } = useTheme();
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
