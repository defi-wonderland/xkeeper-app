import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SearchInput, VaultCard, BasicTabs, NavigationLink, ActiveButton, Icon, NoUserVaults } from '~/components';
import { useStateContext } from '~/hooks';

export const Landing = () => {
  const { userAddress, setSelectedVault, currentTheme, loading, vaults } = useStateContext();

  const [searchValue, setSearchValue] = useState('');

  const ownedVaults = useMemo(() => vaults.filter((vault) => vault.owner === userAddress), [userAddress, vaults]);

  const searchedVaults = useMemo(
    () =>
      vaults.filter(
        (vault) =>
          vault.name?.toLowerCase().includes(searchValue.toLowerCase()) ||
          vault.address.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [searchValue, vaults],
  );

  const exploreVaultSection = [
    {
      title: 'Explore Vaults',

      items: searchedVaults.length ? (
        searchedVaults.map((vault, index) => (
          <NavigationLink to={'/vault/' + vault.address} key={vault.address + '-' + index}>
            <VaultCard vaultData={vault} onClick={() => setSelectedVault(vault)} />
          </NavigationLink>
        ))
      ) : (
        <NoUserVaults text={loading ? 'Loading Vaults...' : 'No matches found, please try again.'} icon='search' />
      ),
    },
  ];

  const myVaultSection = {
    title: 'My Vaults',
    items: ownedVaults.length ? (
      ownedVaults.map((vault, index) => (
        <NavigationLink to={'/vault/' + vault.address} key={vault.address + '-' + index}>
          <VaultCard vaultData={vault} />
        </NavigationLink>
      ))
    ) : (
      <NoUserVaults
        text={loading ? 'Loading Vaults...' : 'You have no active Vaults'}
        icon={loading ? 'search' : 'safe'}
        button={!loading}
      />
    ),
  };

  return (
    <HomeContainer>
      <FirstSection>
        {/* Search Input */}
        <SearchInput placeholder='Vault name or address' value={searchValue} setValue={setSearchValue} />

        {/* Create Vault Button */}
        <NavigationLink to='/create'>
          <CreateVaultBtn variant='contained' size='large' data-testid='create-vault-btn'>
            <SIcon name='plus' size='1.8rem' color={currentTheme.backgroundPrimary} />
            Create Vault
          </CreateVaultBtn>
        </NavigationLink>
      </FirstSection>

      {/* Explore Vault Tabs */}
      <BasicTabs sections={userAddress ? [...exploreVaultSection, myVaultSection] : exploreVaultSection} />
    </HomeContainer>
  );
};
const SIcon = styled(Icon)({
  marginRight: '0.8rem',
});

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

const CreateVaultBtn = styled(ActiveButton)(() => {
  const {
    currentTheme: { borderRadius, actionButton },
  } = useStateContext();
  return {
    fontSize: '1.6rem',
    height: '4.8rem',
    minWidth: '18.3rem',
    px: '1rem',
    textTransform: 'none',
    borderRadius: borderRadius,
    backgroundColor: actionButton,
  };
});
