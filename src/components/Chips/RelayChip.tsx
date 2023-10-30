import { Chip, styled } from '@mui/material';
import { useStateContext } from '~/hooks';

export const RelayChip = ({ text }: { text: string }) => {
  const { currentTheme } = useStateContext();
  return (
    <SChip
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

const SChip = styled(Chip)(() => {
  return {
    maxWidth: '20rem',
    minWidth: '5rem',
    overflow: 'hidden',
  };
});
