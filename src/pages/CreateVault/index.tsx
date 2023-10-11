import { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Address } from 'wagmi';
import { isAddress } from 'viem';

import { DataSection as DescriptionContainer, Title, Header } from '~/pages';
import { BreadCrumbs, VersionChip, ChainDropdown, StyledInput, ActiveButton } from '~/components';
import { useStateContext, useVaultFactory } from '~/hooks';

export const CreateVault = () => {
  const { availableChains, loading, userAddress, currentNetwork } = useStateContext();

  const [vaultName, setVaultName] = useState('');
  const [vaultOwner, setVaultOwner] = useState(userAddress || '');
  const [selectedChain, setSelectedChain] = useState(currentNetwork.id.toString());
  const { handleSendTransaction, writeAsync } = useVaultFactory({ args: [vaultOwner as Address, vaultName] });

  return (
    <PageContainer>
      <BreadCrumbs previousPage='Home' currentPage='Create Vault' />

      <CreateContainer>
        <Header>
          <TitleBox>
            <Title>Create Vault</Title>
            <VersionChip text='V1.0.0' />
          </TitleBox>

          <DescriptionContainer>
            <Description>
              Lorem ipsum dolor sit amet consectetur. Euismod blandit dictum lacus penatibus. In morbi et ut amet
              consectetur arcu. Dui in netus eget nulla lorem nibh erat felis.
            </Description>
          </DescriptionContainer>
        </Header>

        <StyledInput
          label='Vault name'
          description='Your vault name will only be visible to you.'
          value={vaultName}
          setValue={setVaultName}
          disabled={loading}
        />

        <StyledInput
          label='Vault owner'
          description='The vault owner will be able to withdraw funds and make changes to the vault.'
          value={vaultOwner}
          setValue={setVaultOwner}
          error={!!vaultOwner && !isAddress(vaultOwner)}
          errorText='Invalid address'
          disabled={loading}
        />

        <InputContainer>
          <InputLabel>Chain</InputLabel>
          <ChainDropdown
            chains={availableChains}
            value={selectedChain}
            setValue={setSelectedChain}
            disabled={loading}
          />
        </InputContainer>

        {/* Create Button */}
        <ButtonContainer>
          <CreateButton
            variant='contained'
            disabled={!writeAsync || loading || !vaultName}
            onClick={handleSendTransaction}
          >
            {!loading && 'Create Vault'}
            {loading && 'Loading...'}
          </CreateButton>
        </ButtonContainer>
      </CreateContainer>
    </PageContainer>
  );
};

const PageContainer = styled(Box)({
  width: '100%',
  margin: '0 auto',
  padding: '9.6rem 4.8rem',
  backgroundColor: 'inherit',
  minHeight: '100vh',
});

const CreateContainer = styled(Box)({
  maxWidth: '60rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
});

const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  flexDirection: 'row',
  gap: '0.8rem',
});

const Description = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textTertiary,
    fontSize: '1.4rem',
  };
});

const InputContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
});

const InputLabel = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
  };
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  width: '100%',
  marginTop: '3.2rem',
});

const CreateButton = styled(ActiveButton)(() => {
  return {
    width: '18.3rem',
  };
});
