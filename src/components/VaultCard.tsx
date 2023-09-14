import { Box, Card, Typography } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import { styled } from '@mui/material/styles';

import { RelayChip } from '~/components';
import { useStateContext } from '~/hooks';
import { VaultData } from '~/types';

interface VaultCardProps {
  vaultData: VaultData;
}

export const VaultCard = ({ vaultData }: VaultCardProps) => {
  const { currentTheme } = useStateContext();
  const { name, balance, relays, chain, owned, address } = vaultData;
  return (
    <SContainer>
      <SCard variant='outlined' sx={{ borderRadius: currentTheme.borderRadius }}>
        <Box>
          <TitleContainer>
            {/* Vault Alias | Vault Address */}
            <CardTitle sx={{ color: currentTheme.textPrimary }}>{name ? name : address}</CardTitle>

            <Box>
              {/* TODO: Owned Chip */}
              {owned && 'Owned'}

              {/* TODO: Chain Icon */}
              {chain}
            </Box>
          </TitleContainer>

          {/* Vault total balance */}
          <Balance sx={{ color: currentTheme.textDisabled }}>{balance}</Balance>
        </Box>

        {/* Active Relays */}
        <RelayContainer>
          <ChipsContainer>
            {relays.map((relayName) => (
              <RelayChip text={relayName} key={relayName} />
            ))}
          </ChipsContainer>

          {/* See more icon */}
          {/* TODO: get te correct icon */}
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

const SCard = styled(Card)({
  padding: '2rem',
  gap: '2.6rem',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
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

const CardTitle = styled(Typography)({
  fontSize: '2rem',
  fontWeight: '600',
  lineHeight: '3rem',
});

const Balance = styled(Typography)({
  fontSize: '1.6rem',
  fontWeight: '400',
  lineHeight: '2rem',
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
