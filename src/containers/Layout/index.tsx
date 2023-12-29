import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { useTheme } from '~/hooks';
import { Header } from '~/containers';

export const AppLayout = () => {
  const { currentTheme } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: currentTheme.backgroundSecondary,
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
};
