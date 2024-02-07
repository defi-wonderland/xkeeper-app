import { Chip } from '@mui/material';
import { useTheme } from '~/hooks';

export const NoRelayChip = ({ text }: { text: string }) => {
  const { currentTheme } = useTheme();
  return (
    <Chip
      label={text}
      sx={{
        color: currentTheme.warningChipColor,
        backgroundColor: currentTheme.warningChipBackground,
        borderRadius: currentTheme.secondaryBorderRadius,
        fontSize: '1.4rem',
        fontWeight: '600',
        span: {
          padding: '0 0.8rem',
        },
      }}
    />
  );
};
