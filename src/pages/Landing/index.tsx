import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  SearchInput,
  VaultCard,
  BasicTabs,
  NavigationLink,
  ActiveButton,
  Icon,
  NoUserVaults,
  BackToTop,
  MadeByWonderland,
} from '~/components';
import { InfiniteScroll, useStateContext, useTheme } from '~/hooks';

export const Landing = () => {
  const { userAddress, setSelectedVault, loading, vaults, updateVaults } = useStateContext();
  const { currentTheme } = useTheme();

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

  const exploreVaultSection = useMemo(
    () => [
      {
        title: 'Explore Vaults',

        items: searchedVaults.length ? (
          searchedVaults.map((vault, index) => (
            <NavigationLink
              to={'/vault/' + vault.address}
              key={vault.address + '-' + index}
              dataTestId={`vault-card-${index}`}
            >
              <VaultCard vaultData={vault} onClick={() => setSelectedVault(vault)} />
            </NavigationLink>
          ))
        ) : (
          <NoUserVaults text={loading ? 'Loading Vaults...' : 'No matches found, please try again.'} icon='search' />
        ),
      },
    ],
    [loading, searchedVaults, setSelectedVault],
  );

  const myVaultSection = useMemo(
    () => ({
      title: 'My Vaults',
      items: ownedVaults.length ? (
        ownedVaults.map((vault, index) => (
          <NavigationLink
            to={'/vault/' + vault.address}
            key={vault.address + '-' + index}
            dataTestId={`vault-card-${index}`}
          >
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
    }),
    [loading, ownedVaults],
  );

  return (
    <HomeContainer>
      <FirstSection>
        {/* Search Input */}
        <SearchInput placeholder='Vault name or address' value={searchValue} setValue={setSearchValue} />

        {/* Create Vault Button */}
        <NavigationLink to='/create'>
          <CreateVaultBtn variant='contained' size='large' data-test='create-vault-btn'>
            <SIcon name='plus' size='1.8rem' color={currentTheme.actionButtonColor} />
            Create Vault
          </CreateVaultBtn>
        </NavigationLink>
      </FirstSection>

      {/* Explore Vault Tabs */}
      <BasicTabs sections={userAddress ? [...exploreVaultSection, myVaultSection] : exploreVaultSection} />

      {/* Back To Top Button */}
      <BackToTop />

      {/* Made By Wonderland Button */}
      <MadeByWonderland />

      <InfiniteScroll update={updateVaults} loading={loading} />
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

  '@media (max-width: 600px)': {
    padding: '10.2rem 1.6rem 1rem',
  },
});

const FirstSection = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  gap: '2rem',
  padding: '1rem 0rem',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    gap: 0,
    marginBottom: '4rem',
    'div:nth-child(2)': {
      width: '100%',
    },
  },
});

const CreateVaultBtn = styled(ActiveButton)(() => {
  const {
    currentTheme: { borderRadius, actionButton },
  } = useTheme();
  return {
    fontSize: '1.6rem',
    height: '4.8rem',
    minWidth: '18.3rem',
    px: '1rem',
    textTransform: 'none',
    borderRadius: borderRadius,
    backgroundColor: actionButton,

    '@media (max-width: 600px)': {
      minWidth: '100%',
      width: '100%',
      gap: 0,
    },
  };
});
