import { Box, Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { BasicTabs, NavigationLink } from '~/components';

export const Vault = () => {
  const title = 'Connext One';
  const breadcrumbs = [
    <NavigationLink key='1' to='/' variant='inherit' sx={{ fontSize: '1.4rem' }}>
      Home
    </NavigationLink>,
    <Typography key='2' color='text.primary' sx={{ fontSize: '1.4rem' }}>
      {title}
    </Typography>,
  ];

  const sections = [
    {
      title: 'Vault Overview',
      items: null,
    },
    {
      title: 'Activity',
      items: null,
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: '72rem',
        margin: '8rem auto 0',
      }}
    >
      <Breadcrumbs sx={{ my: '2rem' }} separator={<NavigateNextIcon fontSize='medium' />} aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>
      <Typography variant='h3'>{title}</Typography>

      <BasicTabs sections={sections} />
    </Box>
  );
};
