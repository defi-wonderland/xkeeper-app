import { Chip } from '@mui/material';
import { useStateContext } from '~/hooks';

export const RelayChip = ({ text }: { text: string }) => {
  const { currentTheme } = useStateContext();
  return (
    <Chip
      color='success'
      label={text}
      size='medium'
      sx={{
        color: currentTheme.relayChipColor,
        backgroundColor: currentTheme.relayChipBackground,
        borderRadius: currentTheme.secondaryBorderRadius,
        fontSize: '1.4rem',
        fontWeight: '500',
        span: {
          padding: '0 0.8rem',
        },
      }}
    />
  );
};
