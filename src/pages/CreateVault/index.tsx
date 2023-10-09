import { useState } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
import { isAddress } from 'viem';

import { DataSection as DescriptionContainer, Title, Header } from '~/pages';
import { BreadCrumbs, VersionChip, ChainDropdown, StyledInput, ActiveButton } from '~/components';
import { useStateContext } from '~/hooks';
import { vaultFactoryABI } from '~/generated';

export const CreateVault = () => {
  const { addresses, availableChains, loading, setLoading, setNotificationOpen } = useStateContext();
  const publicClient = usePublicClient();

  const [vaultName, setVaultName] = useState('');
  const [vaultOwner, setVaultOwner] = useState('');
  const [selectedChain, setSelectedChain] = useState(Object.keys(availableChains)[0]);

  const { config } = usePrepareContractWrite({
    address: addresses.AutomationVaultFactory,
    abi: vaultFactoryABI,
    functionName: 'deployAutomationVault',
    args: [vaultOwner as Address, vaultName],
    chainId: Number(selectedChain),
  });

  const { writeAsync } = useContractWrite(config);

  const handleCreateVault = async () => {
    setLoading(true);
    try {
      // temporary log
      console.log('creating vault...');
      if (writeAsync) {
        const writeResult = await writeAsync();
        await publicClient.waitForTransactionReceipt(writeResult);
        setNotificationOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

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
          <CreateButton variant='contained' disabled={!writeAsync || loading || !vaultName} onClick={handleCreateVault}>
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
