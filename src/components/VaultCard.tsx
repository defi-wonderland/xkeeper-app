import { Box, Card } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { styled } from '@mui/material/styles';

import { ChainIcon, InfoChip, RelayChip, STooltip, StyledText, StyledTitle } from '~/components';
import { useStateContext } from '~/hooks';
import { getRelayName } from '~/utils';
import { VaultData } from '~/types';

interface VaultCardProps {
  vaultData: VaultData;
  onClick?: () => void;
}

export const VaultCard = ({ vaultData, onClick }: VaultCardProps) => {
  const { currentTheme, userAddress } = useStateContext();
  const { name, balance, relays, chain, owner, address } = vaultData;

  return (
    <SContainer onClick={onClick}>
      <SCard variant='outlined' sx={{ borderRadius: currentTheme.borderRadius }}>
        <Box>
          <TitleContainer>
            {/* Vault Alias | Vault Address */}
            <STooltip text='Custom Alias (only you can see this)'>
              <CardTitle sx={{ color: currentTheme.textPrimary }}>{name ? name : address}</CardTitle>
            </STooltip>

            <SBox>
              {/* TODO: add Owned Icon */}
              {owner === userAddress && <InfoChip>Vault Owned</InfoChip>}

              <ChainIcon chainName={chain} />
            </SBox>
          </TitleContainer>

          {/* Vault total balance */}
          <Balance sx={{ color: currentTheme.textDisabled }}>{balance}</Balance>
        </Box>

        {/* Active Relays */}
        <RelayContainer>
          <ChipsContainer>
            {Object.keys(relays)?.map((relayName) => <RelayChip text={getRelayName(relayName)} key={relayName} />)}
          </ChipsContainer>

          {/* See more icon */}
          {/* TODO: get the correct icon */}
          <EastIcon fontSize='large' sx={{ color: currentTheme.textDisabled, opacity: '0.5', fontSize: '2.6rem' }} />
        </RelayContainer>
      </SCard>
    </SContainer>
  );
};

const SContainer = styled(Box)({
  display: 'flex',
  flexdirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  margin: '2.4rem auto',
});

const SCard = styled(Card)(() => {
  const { currentTheme } = useStateContext();
  return {
    backgroundColor: currentTheme.backgroundPrimary,
    padding: '2rem',
    gap: '2.6rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxShadow: '0px 2px 10px 0px rgba(16, 24, 40, 0.02)',
  };
});

const TitleContainer = styled(Box)({
  gap: '2rem',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '1.4rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

const CardTitle = styled(StyledTitle)({
  fontSize: '2rem',
  fontWeight: '600',
  lineHeight: '3rem',
});

const SBox = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
});

const Balance = styled(StyledText)({
  fontSize: '1.6rem',
  fontWeight: '400',
  lineHeight: '2rem',
  marginTop: '0.4rem',
});

const RelayContainer = styled(Box)({
  gap: '2rem',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '1.4rem',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

const ChipsContainer = styled(Box)({
  display: 'flex',
  gap: '0.8rem',
});
