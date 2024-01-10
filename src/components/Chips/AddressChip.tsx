import { useState } from 'react';
import { Box, styled } from '@mui/material';

import { useStateContext, useTheme } from '~/hooks';
import { Icon, STooltip, StyledText } from '~/components';
import { copyData, truncateAddress } from '~/utils';

interface AddressChipProps {
  text: string;
  label?: string;
}

export const AddressChip = ({ text, label }: AddressChipProps) => {
  const { currentNetwork } = useStateContext();
  const { currentTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    copyData(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 800);
  };
  return (
    <SBox onClick={handleCopy}>
      <TextContainer>
        <SText>{label}:</SText>
        <STooltip text={text} address>
          <SText>{truncateAddress(text)}</SText>
        </STooltip>
      </TextContainer>

      <STooltip text={copied ? 'Copied!' : 'Copy Address'}>
        <IconContainer>
          {!copied && <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />}
          {copied && <Icon name='check' color={currentTheme.textDisabled} size='1.7rem' />}
        </IconContainer>
      </STooltip>

      <ExternalLink href={`${currentNetwork.scanner}/address/${text}`} target='_blank'>
        <IconContainer>
          <Icon name='external-link' color={currentTheme.textDisabled} size='1.6rem' />
        </IconContainer>
      </ExternalLink>
    </SBox>
  );
};

const SText = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.addressChipColor,
    fontWeight: '500',
  };
});

const SBox = styled(Box)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.addressChipColor,
    backgroundColor: currentTheme.addressChipBackground,
    fontSize: '1.4rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontWeight: '500',
    height: 'auto',
    borderRadius: '1.6rem',
    padding: '0.3rem 1rem 0.2rem 1rem',
    lineHeight: '2rem',
    width: 'fit-content',
    cursor: 'pointer',
  };
});

const TextContainer = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '0.4rem',
  };
});

const ExternalLink = styled('a')(() => {
  return {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
  };
});

export const IconContainer = styled('div')(() => {
  const { currentTheme } = useTheme();
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: currentTheme.addressChipIconColor,
    'i:hover:before': {
      color: currentTheme.textSecondary,
      transition: currentTheme.basicTransition,
    },
  };
});
