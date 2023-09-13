import { Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { SearchInput, VaultCard, BasicTabs, NavigationLink } from '~/components';

export const Landing = () => {
  const vaults = [
    {
      name: 'Connext One',
      address: '0x48268230fda49480579f8843c368e5f7138f4767',
      relays: ['GelatoRelay', 'OpenRelay'],
    },
    {
      name: 'Connext Two',
      address: '0x48268230fda49480579f8843c368e5f7138f4767',
      relays: ['GelatoRelay', 'OpenRelay'],
    },
  ];

  const sections = [
    {
      title: 'Explore Vaults',
      items: vaults.map((vault, index) => (
        <NavigationLink to={'/vault/' + vault.address} key={vault.name + '-' + index}>
          <VaultCard name={vault.name} address={vault.address} relays={vault.relays} />
        </NavigationLink>
      )),
    },
    {
      title: 'My Vaults',
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
      <Typography variant='body1' data-testid='boilerplate-title'>
        Landing
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: '2rem',
        }}
      >
        <SearchInput placeholder='Vault name or address' />

        <Button
          variant='contained'
          size='large'
          startIcon={<AddIcon />}
          sx={{ fontSize: 14, height: '5.2rem', minWidth: '20rem' }}
        >
          Create Vault
        </Button>
      </Box>

      <BasicTabs sections={sections} />
    </Box>
  );
};
