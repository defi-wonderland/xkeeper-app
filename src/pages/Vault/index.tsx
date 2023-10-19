import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNetwork } from 'wagmi';
import { Address } from 'viem';

import {
  AddressChip,
  BasicTabs,
  BreadCrumbs,
  CloseButton as EditAliasButton,
  Icon,
  InfoChip,
  STooltip,
} from '~/components';
import { getPrices, getTokenList, getVaultsData } from '~/utils';
import { useStateContext } from '~/hooks';
import { Tokens } from './Tokens';
import { EnabledRelays } from './EnabledRelays';
import { EnabledJobs } from './EnabledJobs';
import { Activity } from './Activity';
import { ModalType } from '~/types';
import { getConfig, publicClient } from '~/config';

export const Vault = () => {
  const {
    currentTheme,
    selectedVault,
    currentNetwork,
    notification,
    aliasData,
    setModalOpen,
    setSelectedVault,
    setSelectedItem,
  } = useStateContext();
  const { DEFAULT_WETH_ADDRESS } = getConfig();
  const { address } = useParams();
  const { chain } = useNetwork();

  const [isLoading, setLoading] = useState<boolean>(false);

  const chainName = currentNetwork.displayName;
  const vaultAddress = selectedVault?.address || '';
  const version = 'V1.0.0';

  const sections = [
    {
      title: 'Vault Overview',
      items: (
        <>
          <Tokens />
          <EnabledRelays />
          <EnabledJobs />
        </>
      ),
    },
    {
      title: 'Activity',
      items: (
        <>
          <Activity />
        </>
      ),
    },
  ];

  const loadSelectedVault = async () => {
    setLoading(true);
    try {
      const tokens = getTokenList(chain?.id);
      const tokenAddressList = [...tokens.map((token) => token.address), DEFAULT_WETH_ADDRESS];

      const currentChain = publicClient.chain.name.toLocaleLowerCase();
      // Load tokens from mainnet when on goerli
      const chainName = currentChain === 'goerli' ? 'ethereum' : currentChain;

      const prices = await getPrices(chainName, tokenAddressList);
      const vaultData = await getVaultsData(publicClient, [address as Address], tokens, prices);

      setLoading(false);
      setSelectedVault(vaultData[0]);
    } catch (error) {
      setLoading(false);
      console.error(`Error loading vault ${address}:`, error);
    }
  };

  const handleEditAlias = () => {
    setSelectedItem({ type: 'vault', address: selectedVault?.address || '0x', params: [] });
    setModalOpen(ModalType.EDIT_ALIAS);
  };

  useEffect(() => {
    if (!selectedVault?.address) {
      loadSelectedVault();
    }
  }, []);

  useEffect(() => {
    if (notification.open) {
      loadSelectedVault();
    }
  }, [notification.open]);

  return (
    <PageContainer>
      {/* Navigation */}
      <BreadCrumbs previousPage='Home' currentPage='Vault' />

      <VaultContainer>
        <Header>
          {/* Vault Address | Vault Alias */}
          <TitleContainer>
            <TitleBox>
              <Title>{aliasData[vaultAddress] || selectedVault?.name}</Title>

              <STooltip text='Edit vault alias'>
                <EditAliasButton variant='text' onClick={handleEditAlias}>
                  <Icon name='pencil-square' color={currentTheme.textDisabled} size='2rem' />
                </EditAliasButton>
              </STooltip>
            </TitleBox>

            {/* Owner Icon */}
            <STooltip text='You own this vault'>
              <SInfoChip>
                <Icon name='owned' />
              </SInfoChip>
            </STooltip>
          </TitleContainer>

          <DataSection>
            {/* Contract and Owner addresses */}
            <DataContainer>
              <AddressChip label='Contract' text={selectedVault?.address || ''} />
              <AddressChip label='Owner' text={selectedVault?.owner || ''} />
            </DataContainer>

            {/* Vault version and Chain */}
            <DataContainer>
              <Version sx={{ color: currentTheme.textDisabled }}>{version}</Version>
              <InfoChip>{chainName}</InfoChip>
            </DataContainer>
          </DataSection>
        </Header>

        <BasicTabs sections={sections} isLoading={isLoading} />
      </VaultContainer>
    </PageContainer>
  );
};

const PageContainer = styled(Box)({
  width: '100%',
  margin: '0 auto',
  padding: '9.6rem 4.8rem',
  backgroundColor: 'inherit',
});

export const VaultContainer = styled(Box)({
  maxWidth: '80rem',
  margin: '0 auto',
});

export const Header = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  alignItems: 'start',
  justifyContent: 'center',
  width: '100%',
  marginTop: '2.8rem',
  marginBottom: '2rem',
});

export const TitleContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
});

export const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  gap: '0.8rem',
});

export const Title = styled(Typography)({
  fontSize: '3rem',
  lineHeight: '3.8rem',
  fontWeight: 600,
});

export const DataSection = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
});

export const DataContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.8rem',
});

const Version = styled(Typography)({
  fontSize: '1.4rem',
  fontWeight: '400',
  lineHeight: '2rem',
  padding: '0.2rem 1rem',
});

const SInfoChip = styled(Box)(() => {
  const { currentTheme } = useStateContext();

  return {
    color: currentTheme.infoChipColor,
    backgroundColor: currentTheme.infoChipBackground,
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontWeight: '500',
    height: 'auto',
    borderRadius: '100%',
    padding: '0.6rem 0.6rem 0.5rem 0.6rem',
    lineHeight: '2rem',
    width: 'fit-content',
  };
});
