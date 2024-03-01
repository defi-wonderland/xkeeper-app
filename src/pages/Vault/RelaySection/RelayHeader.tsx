import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { AddressChip, Icon, IconContainer, STooltip, StyledText, StyledTitle, SubTitle } from '~/components';
import { copyData, getRelayName, truncateAddress } from '~/utils';
import { useAlias, useStateContext, useTheme } from '~/hooks';
import { ButtonsContainer } from '../Tokens';
import { OptionsMenu } from '~/containers';

interface RelayHeaderProps {
  relayAddress: string;
  callers: string[];
}

export const RelayHeader = ({ relayAddress, callers }: RelayHeaderProps) => {
  const { currentTheme } = useTheme();
  const { aliasData } = useAlias();
  const { userAddress, selectedVault, currentNetwork } = useStateContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    copyData(relayAddress);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 800);
  };

  return (
    <SectionHeader>
      <TitleContainer>
        <Box>
          <StyledTitle>{aliasData[relayAddress] || getRelayName(relayAddress, currentNetwork?.id)}</StyledTitle>

          <STooltip text={relayAddress} address>
            <StyledText onClick={handleCopy}>{truncateAddress(relayAddress)}</StyledText>
          </STooltip>
          <STooltip text={copied ? 'Copied!' : 'Copy Address'}>
            <IconContainer onClick={handleCopy}>
              {!copied && <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />}
              {!!copied && <Icon name='check' color={currentTheme.textDisabled} size='1.7rem' />}
            </IconContainer>
          </STooltip>
        </Box>

        {userAddress && selectedVault?.owner === userAddress && (
          <ButtonsContainer>
            {/* Options Menu */}
            <RowButton data-test='relay-options'>
              <OptionsMenu relayAddress={relayAddress} />
            </RowButton>
          </ButtonsContainer>
        )}
      </TitleContainer>

      <SSubTitle>
        <CallersText>Callers: </CallersText>
        <CallersContainers>
          {callers.map((caller) => (
            <AddressChip key={caller} text={caller} externalLink={false} />
          ))}
        </CallersContainers>
      </SSubTitle>
    </SectionHeader>
  );
};

const SectionHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'start',
  marginBottom: '2.4rem',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1.6rem',
  },
});

const TitleContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  width: '100%',
  minWidth: '100%',
  height: '4.5rem',
  div: {
    p: {
      cursor: 'pointer',
    },
    display: 'flex',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',
    i: {
      cursor: 'pointer',
    },
    span: {
      paddingTop: '0.2rem',
      cursor: 'pointer',
      marginLeft: '0.6rem',
    },
  },
  '@media (max-width: 600px)': {
    'div:first-child': {
      diplay: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: '0.6rem',
    },
  },
});

const SSubTitle = styled(SubTitle)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'start',
  gap: '1.2rem',
  paddingTop: '0.6rem',
  span: { cursor: 'pointer' },
});

const CallersContainers = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.6rem',
  span: { cursor: 'pointer' },
});

const RowButton = styled(Box)(() => {
  const { currentTheme } = useTheme();
  return {
    padding: '0rem',
    height: '4.5rem',
    minWidth: '4.5rem',
    width: '4.5rem',
    borderRadius: '100%',
    '&:hover': {
      transition: currentTheme.basicTransition,
      backgroundColor: currentTheme.backgroundHover,
    },
    button: {
      borderRadius: '100%',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});

const CallersText = styled(StyledText)({
  fontWeight: '500',
  paddingTop: '0.3rem',
});
