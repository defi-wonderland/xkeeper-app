import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { useNetwork } from 'wagmi';

import { useStateContext } from '~/hooks';
import { Icon, STooltip, StyledText } from '~/components';
import { copyData, truncateAddress } from '~/utils';

interface AddressChipProps {
  text: string;
  label?: string;
}

export const AddressChip = ({ text, label }: AddressChipProps) => {
  const { availableChains, currentTheme } = useStateContext();
  const { chain } = useNetwork();
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
      <SText>{label ? `${label}: ${truncateAddress(text)}` : truncateAddress(text)}</SText>

      <STooltip text={'Copied!'} open={copied}>
        <IconContainer>
          <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />
        </IconContainer>
      </STooltip>

      <ExternalLink href={`${availableChains[chain?.id || 5].scanner}/address/${text}`} target='_blank'>
        <IconContainer>
          <Icon name='external-link' color={currentTheme.textDisabled} size='1.6rem' />
        </IconContainer>
      </ExternalLink>
    </SBox>
  );
};

const SText = styled(StyledText)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.addressChipColor,
    fontWeight: '500',
  };
});

const SBox = styled(Box)(() => {
  const { currentTheme } = useStateContext();
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

const ExternalLink = styled('a')(() => {
  return {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
  };
});

export const IconContainer = styled('div')(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.addressChipIconColor,
    'i:hover:before': {
      color: currentTheme.textSecondary,
      transition: 'all 0.2s ease-in-out',
    },
  };
});
