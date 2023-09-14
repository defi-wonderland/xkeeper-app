import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { useStateContext } from '~/hooks';
import { Header } from '~/containers';

export const AppLayout = () => {
  const { currentTheme } = useStateContext();

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
