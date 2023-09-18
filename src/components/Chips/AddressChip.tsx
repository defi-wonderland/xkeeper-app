import { Box } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';

import { useStateContext } from '~/hooks';

interface AddressChipProps {
  text: string;
  label?: string;
}

export const AddressChip = ({ text, label }: AddressChipProps) => {
  const { currentTheme } = useStateContext();

  return (
    <Box
      sx={{
        color: currentTheme.addressChipColor,
        backgroundColor: currentTheme.addressChipBackground,
        fontSize: '1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontWeight: '500',
        height: 'auto',
        borderRadius: '1.6rem',
        padding: '0.2rem 1rem',
        lineHeight: '2rem',
        width: 'fit-content',
      }}
    >
      {label ? `${label}: ${text}` : text}
      <ContentCopyIcon sx={{ color: currentTheme.addressChipIconColor }} />
      <LaunchIcon sx={{ color: currentTheme.addressChipIconColor }} />
    </Box>
  );
};
