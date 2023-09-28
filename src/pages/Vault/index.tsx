import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

import { AddressChip, BasicTabs, BreadCrumbs, CloseButton as EditAliasButton, InfoChip, STooltip } from '~/components';
import { truncateAddress } from '~/utils';
import { useStateContext } from '~/hooks';
import { Tokens } from './Tokens';
import { EnabledRelays } from './EnabledRelays';
import { EnabledJobs } from './EnabledJobs';
import { Activity } from './Activity';
import { ModalType } from '~/types';

export const Vault = () => {
  const { currentTheme, setModalOpen } = useStateContext();

  // temporary
  const title = 'Connext One';
  const chain = 'Ethereum Mainnet';
  const version = 'V1.0.0';
  const contractAddress = '0x1234567890123456789012345678901234567890';
  const ownerAddress = '0x1234567890123456789012345678901234567890';

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

  return (
    <PageContainer>
      {/* Navigation */}
      <BreadCrumbs previousPage='Home' currentPage='Vault' />

      <VaultContainer>
        <Header>
          {/* Vault Address | Vault Alias */}
          <TitleContainer>
            <TitleBox>
              <Title>{title}</Title>

              <STooltip text='Edit vault alias'>
                <EditAliasButton variant='text' onClick={() => setModalOpen(ModalType.EDIT_ALIAS)}>
                  <EditIcon />
                </EditAliasButton>
              </STooltip>
            </TitleBox>

            {/* Owner Icon */}
            <STooltip text='You own this vault'>
              <SInfoChip
                sx={{
                  color: currentTheme.infoChipColor,
                  backgroundColor: currentTheme.infoChipBackground,
                }}
              >
                <EditIcon sx={{ fontSize: '1.8rem' }} />
              </SInfoChip>
            </STooltip>
          </TitleContainer>

          <DataSection>
            {/* Contract and Owner addresses */}
            <DataContainer>
              <AddressChip label='Contract' text={truncateAddress(contractAddress)} />
              <AddressChip label='Owner' text={truncateAddress(ownerAddress)} />
            </DataContainer>

            {/* Vault version and Chain */}
            <DataContainer>
              <Version sx={{ color: currentTheme.textDisabled }}>{version}</Version>
              <InfoChip>{chain}</InfoChip>
            </DataContainer>
          </DataSection>
        </Header>

        <BasicTabs sections={sections} />
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

const SInfoChip = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
  fontWeight: '500',
  height: 'auto',
  borderRadius: '100%',
  padding: '0.6rem',
  lineHeight: '2rem',
  width: 'fit-content',
});
