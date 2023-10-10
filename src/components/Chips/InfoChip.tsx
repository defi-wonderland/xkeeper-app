import { Box } from '@mui/material';
import { useStateContext } from '~/hooks';

interface InfoChipProps {
  children: React.ReactNode;
}

export const InfoChip = ({ children }: InfoChipProps) => {
  const { currentTheme } = useStateContext();

  return (
    <Box
      sx={{
        color: currentTheme.infoChipColor,
        backgroundColor: currentTheme.infoChipBackground,
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
      }}
    >
      {children}
    </Box>
  );
};
