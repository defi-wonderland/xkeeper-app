import { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SearchInput, VaultCard, BasicTabs, NavigationLink, ActiveButton, Icon } from '~/components';
import { getVaults, getVaultsData } from '~/utils';
import { useStateContext } from '~/hooks';
import { VaultData } from '~/types';

export const Landing = () => {
  const { addresses, userAddress, setSelectedVault, currentTheme } = useStateContext();

  const [vaults, setVaults] = useState<VaultData[]>([]);
  const ownedVaults = useMemo(() => vaults.filter((vault) => vault.owner === userAddress), [userAddress, vaults]);

  const exploreVaultSection = [
    {
      title: 'Explore Vaults',
      items: vaults.map((vault, index) => (
        <NavigationLink to={'/vault/' + vault.address} key={vault.address + '-' + index}>
          <VaultCard vaultData={vault} onClick={() => setSelectedVault(vault)} />
        </NavigationLink>
      )),
    },
  ];

  const myVaultSection = {
    title: 'My Vaults',
    items: ownedVaults.map((vault, index) => (
      <NavigationLink to={'/vault/' + vault.address} key={vault.address + '-' + index}>
        <VaultCard vaultData={vault} />
      </NavigationLink>
    )),
  };

  useEffect(() => {
    getVaults(addresses.AutomationVaultFactory).then((vaults) => {
      getVaultsData(vaults).then((vaultsData) => setVaults(vaultsData));
    });
  }, []);

  return (
    <HomeContainer>
      <FirstSection>
        {/* Search Input */}
        <SearchInput placeholder='Vault name or address' />

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
