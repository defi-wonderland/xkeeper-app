import { Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

import { SearchInput, VaultCard, BasicTabs, NavigationLink } from '~/components';
import { useStateContext } from '~/hooks';
import { VaultData } from '~/types';

export const Landing = () => {
  const vaults: VaultData[] = [
    {
      name: 'Connext One',
      address: '0x1234567890123456789012345678901234567890',
      balance: '$1,000,000',
      relays: ['GelatoRelay', 'OpenRelay'],
      chain: 'ethereum',
      owned: true,
    },
    {
      name: 'Connext Two',
      address: '0x1234567890123456789012345678901234567891',
      balance: '$41,000,000',
      relays: ['GelatoRelay', 'OpenRelay'],
      chain: 'optimism',
    },
  ];

  const sections = [
    {
      title: 'Explore Vaults',
      items: vaults.map((vault, index) => (
        <NavigationLink to={'/vault/' + vault.address} key={vault.address + '-' + index}>
          <VaultCard vaultData={vault} />
        </NavigationLink>
      )),
    },
    {
      title: 'My Vaults',
      items: (
        <NavigationLink to={'/vault/' + '0x1234567890123456789012345678901234567890'}>
          <VaultCard
            vaultData={{
              name: 'Connext One',
              address: '0x1234567890123456789012345678901234567890',
              balance: '$1,000,000',
              relays: ['GelatoRelay', 'OpenRelay'],
              chain: 'ethereum',
              owned: true,
            }}
          />
        </NavigationLink>
      ),
    },
  ];

  return (
    <HomeContainer>
      <FirstSection>
        {/* Search Input */}
        <SearchInput placeholder='Vault name or address' />

        {/* Create Vault Button */}
        <NavigationLink to='/create'>
          <CreateVaultBtn variant='contained' size='large' startIcon={<AddIcon />} data-testid='create-vault-btn'>
            Create Vault
          </CreateVaultBtn>
        </NavigationLink>
      </FirstSection>

      {/* Explore Vault Tabs */}
      <BasicTabs sections={sections} />
    </HomeContainer>
  );
};

const HomeContainer = styled(Box)({
  maxWidth: '60rem',
  margin: '0 auto',
  padding: '15rem 0',
  backgroundColor: 'inherit',
});

const FirstSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '2rem',
  padding: '1rem 0rem',
});

const CreateVaultBtn = styled(Button)(() => {
  const {
    currentTheme: { borderRadius, actionButton },
  } = useStateContext();
  return {
    fontSize: '1.6rem',
    height: '4.8rem',
    minWidth: '18.3rem',
    boxShadow: 'none',
    px: '1rem',
    textTransform: 'none',
    borderRadius: borderRadius,
    backgroundColor: actionButton,
    '&:hover': {
      backgroundColor: actionButton,
    },
  };
});
