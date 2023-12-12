import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNetwork } from 'wagmi';
import { Address } from 'viem';

import {
  AddressChip,
  BackToTop,
  BasicTabs,
  BreadCrumbs,
  CloseButton as EditAliasButton,
  Icon,
  InfoChip,
  MadeByWonderland,
  STooltip,
} from '~/components';
import { getCustomClient, getPrices, getTokenList, getVaultsData } from '~/utils';
import { useStateContext } from '~/hooks';
import { Tokens } from './Tokens';
import { EnabledRelays } from './EnabledRelays';
import { EnabledJobs } from './EnabledJobs';
import { Activity } from './Activity';
import { ModalType } from '~/types';
import { getConfig } from '~/config';

export const Vault = () => {
  const {
    userAddress,
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

  const loadSelectedVault = useCallback(async () => {
    setLoading(true);
    try {
      const publicClient = getCustomClient(currentNetwork.id, userAddress);
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
  }, [DEFAULT_WETH_ADDRESS, address, chain?.id, currentNetwork.id, setSelectedVault, userAddress]);

  const handleEditAlias = () => {
    setSelectedItem({ type: 'vault', address: selectedVault?.address || '0x', params: [] });
    setModalOpen(ModalType.EDIT_ALIAS);
  };

  useEffect(() => {
    if (!selectedVault?.address) {
      loadSelectedVault();
    }
  }, [loadSelectedVault, selectedVault?.address]);

  useEffect(() => {
    if (notification.open) {
      loadSelectedVault();
    }
  }, [loadSelectedVault, notification.open]);

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
            <SecondDataContainer>
              <Version sx={{ color: currentTheme.textDisabled }}>{version}</Version>
              <InfoChip>{chainName}</InfoChip>
            </SecondDataContainer>
          </DataSection>
        </Header>

        <BasicTabs sections={sections} isLoading={isLoading} />
      </VaultContainer>

      {/* Back To Top Button */}
      <BackToTop />

      {/* Made By Wonderland Button */}
      <MadeByWonderland />
    </PageContainer>
  );
};

const PageContainer = styled(Box)({
  width: '100%',
  margin: '0 auto',
  padding: '9.6rem 4.8rem',
  backgroundColor: 'inherit',

  '@media (max-width: 600px)': {
    padding: '9.6rem 1.6rem 3.2rem',
  },
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
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '70rem',
});

export const DataSection = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1.4rem',
  },
});

export const DataContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.8rem',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1.4rem',
  },
});

export const SecondDataContainer = styled(DataContainer)({
  '@media (max-width: 600px)': {
    flexDirection: 'row',
  },
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
