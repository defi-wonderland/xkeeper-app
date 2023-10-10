import { Box, styled } from '@mui/material';

import { useStateContext } from '~/hooks';

interface VersionChipProps {
  text: string;
  label?: string;
}

export const VersionChip = ({ text, label }: VersionChipProps) => {
  return <SInfoChip>{label ? `${label}: ${text}` : text}</SInfoChip>;
};

const SInfoChip = styled(Box)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.addressChipColor,
    backgroundColor: currentTheme.addressChipBackground,
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontWeight: '500',
    height: 'auto',
    borderRadius: '1.6rem',
    padding: '0.3rem 1rem',
    lineHeight: '2rem',
    width: 'fit-content',
  };
});
