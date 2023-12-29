import { Box, Card, styled } from '@mui/material';

import { ChainIcon, Icon, InfoChip, NoRelayChip, RelayChip, STooltip, StyledText, StyledTitle } from '~/components';
import { formatDataNumber, getRelayName } from '~/utils';
import { useAlias, useStateContext, useTheme } from '~/hooks';
import { VaultData } from '~/types';
import { Description } from '~/pages';

interface VaultCardProps {
  vaultData: VaultData;
  onClick?: () => void;
}

export const VaultCard = ({ vaultData, onClick }: VaultCardProps) => {
  const { userAddress } = useStateContext();
  const { currentTheme } = useTheme();
  const { aliasData } = useAlias();
  const { name, totalValue, relays, chain, owner, address } = vaultData;

  const activeRelays = Object.keys(relays);
  const vaultAlias = aliasData[address];
  const vaultName = name ? name : address;

  return (
    <SContainer onClick={onClick}>
      <SCard variant='outlined' sx={{ borderRadius: currentTheme.borderRadius }}>
        <Box>
          <TitleContainer>
            {/* Vault Alias | Vault Address */}
            <STooltip text='Custom Alias (only you can see this)'>
              <CardTitle sx={{ color: currentTheme.textPrimary }}>{vaultAlias ? vaultAlias : vaultName}</CardTitle>
            </STooltip>

            <SBox>
              {owner === userAddress && (
                <InfoChip>
                  Vault Owned
                  <Icon name='owned' size='1.6rem' />
                </InfoChip>
              )}

              <ChainIcon chainName={chain} />
            </SBox>
          </TitleContainer>

          {/* Vault total balance */}
          <Balance sx={{ color: currentTheme.textDisabled }}>{formatDataNumber(totalValue, 18, 2, true)}</Balance>

          {/* Vault Description */}
          <DescriptionContainer>
            <Description>{vaultData?.description || ''}</Description>
          </DescriptionContainer>
        </Box>

        {/* Active Relays */}
        <RelayContainer>
          <ChipsContainer>
            {!!activeRelays.length &&
              activeRelays.map((relayAddress) => (
                <RelayChip text={aliasData[relayAddress] || getRelayName(relayAddress)} key={relayAddress} />
              ))}

            {!activeRelays.length && <NoRelayChip text='No active relays' />}
          </ChipsContainer>

          {/* See more icon */}
          <Icon name='arrow-right' size='2.4rem' color={currentTheme.textSecondaryDisabled} />
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
  const { currentTheme } = useTheme();
  return {
    backgroundColor: currentTheme.backgroundPrimary,
    borderColor: currentTheme.backButtonBorderColor,
    padding: '2rem',
    gap: '2.6rem',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxShadow: '0px 2px 10px 0px rgba(16, 24, 40, 0.02)',
    '&:hover': {
      borderColor: currentTheme.textSecondaryDisabled,
      boxShadow: '0px 2px 12px 0px rgba(16, 24, 40, 0.04)',
      transition: currentTheme.basicTransition,
    },

    '&:hover .icon-arrow-right:before': {
      color: currentTheme.textDisabled,
      transition: currentTheme.basicTransition,
    },
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
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '60%',

  '@media (max-width: 600px)': {
    maxWidth: '40%',
  },
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
  maxWidth: 'calc(100% - 6rem)',
  overflow: 'hidden',
});

const DescriptionContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginTop: '0.8rem',
  maxHeight: '6rem',
  p: {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '2rem',
  },
});
