import { Box } from '@mui/material';
import { useStateContext } from '~/hooks';

interface WarningChipProps {
  children: React.ReactNode;
}

export const WarningChip = ({ children }: WarningChipProps) => {
  const { currentTheme } = useStateContext();

  return (
    <Box
      sx={{
        color: currentTheme.warningChipColor,
        backgroundColor: currentTheme.warningChipBackground,
        borderRadius: currentTheme.borderRadius,
        fontSize: '1.4rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.8rem',
        fontWeight: '500',
        height: 'auto',
        padding: '0.8rem 1.4rem',
        lineHeight: '2rem',
        width: '100%',
      }}
    >
      {children}
    </Box>
  );
};
