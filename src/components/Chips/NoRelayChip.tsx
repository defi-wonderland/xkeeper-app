import { Chip } from '@mui/material';
import { useStateContext } from '~/hooks';

export const NoRelayChip = ({ text }: { text: string }) => {
  const { currentTheme } = useStateContext();
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
