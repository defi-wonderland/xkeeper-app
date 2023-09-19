import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';

import { AddressChip, BasicTabs, BreadCrumbs, InfoChip, STooltip } from '~/components';
import { truncateAddress } from '~/utils';
import { useStateContext } from '~/hooks';
import { Tokens } from './Tokens';
import { EnabledRelays } from './EnabledRelays';
import { EnabledJobs } from './EnabledJobs';
import { Activity } from './Activity';

export const Vault = () => {
  const { currentTheme } = useStateContext();

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
      <BreadCrumbs currentPage='Vault' previousPage='Home' />

      <VaultContainer>
        <Header>
          {/* Vault Address | Vault Alias */}
          <TitleContainer>
            <TitleBox>
              <Typography variant='h3'>{title}</Typography>

              <STooltip text='Edit vault alias'>
                <EditIcon />
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

const VaultContainer = styled(Box)({
  maxWidth: '80rem',
  margin: '0 auto',
});

const Header = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  alignItems: 'start',
  justifyContent: 'center',
  width: '100%',
  marginTop: '2.8rem',
  marginBottom: '2rem',
});

const TitleContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
});

const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  gap: '0.8rem',
});

const DataSection = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
});

const DataContainer = styled(Box)({
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
