import { useMemo } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { BackToTop, BasicTabs, BreadCrumbs, MadeByWonderland } from '~/components';
import { useAlias, useFetchSelectedVault, useModal, useStateContext } from '~/hooks';
import { Activity } from './Activity';
import { Tokens } from './Tokens';
import { ModalType, Status } from '~/types';
import { truncateAddress } from '~/utils';
import { Modals } from './Modals';
import { RelaySection } from './RelaySection';
import { VaultHeader } from './VaultHeader';
import { EnabledRelays } from './EnabledRelays';

export const Vault = () => {
  const { userAddress, currentNetwork, setSelectedItem } = useStateContext();
  const { setModalOpen } = useModal();
  const { aliasData } = useAlias();

  const { requestStatus, data: selectedVault } = useFetchSelectedVault();

  const chainName = currentNetwork.displayName;
  const vaultAddress = selectedVault?.address || '';

  const vaultTitle = useMemo(() => {
    if (requestStatus === Status.LOADING) return '...';
    return aliasData[vaultAddress] || selectedVault?.name || truncateAddress(selectedVault?.address);
  }, [aliasData, requestStatus, selectedVault?.address, selectedVault?.name, vaultAddress]);

  const relays = useMemo(() => selectedVault?.relays || {}, [selectedVault?.relays]);

  const sections = [
    {
      title: 'Vault Overview',
      items: (
        <>
          <Tokens />
          <EnabledRelays />
          {Object.entries(relays).map(([relayAddress, relayData]) => (
            <RelaySection relayAddress={relayAddress} relayData={relayData} key={relayAddress} />
          ))}
        </>
      ),
    },
    {
      title: 'Activity',
      items: <Activity />,
    },
  ];

  const handleEditMetadata = () => {
    setSelectedItem({
      type: 'vault',
      selectedAddress: selectedVault?.address,
    });
    setModalOpen(ModalType.ADD_METADATA);
  };

  const handleOpenAddMetadata = () => {
    setModalOpen(ModalType.ADD_METADATA);
  };

  return (
    <PageContainer>
      {/* Component that contains all modals */}
      <Modals />

      {/* Navigation */}
      <BreadCrumbs previousPage='Home' currentPage='Vault' />

      <VaultContainer>
        {/* Vault Header */}
        <VaultHeader
          handleEditMetadata={handleEditMetadata}
          handleOpenAddMetadata={handleOpenAddMetadata}
          selectedVault={selectedVault}
          vaultTitle={vaultTitle}
          userAddress={userAddress}
          chainName={chainName}
        />

        <BasicTabs sections={sections} isLoading={requestStatus === Status.LOADING} />
      </VaultContainer>

      {/* Back To Top Button */}
      <BackToTop />

      {/* Made By Wonderland Button */}
      <MadeByWonderland />
    </PageContainer>
  );
};

const PageContainer = styled(Box)({
  width: '100%',
  margin: '0 auto',
  padding: '9.6rem 4.8rem',
  backgroundColor: 'inherit',

  '@media (max-width: 600px)': {
    padding: '9.6rem 1.6rem 3.2rem',
  },
});

const VaultContainer = styled(Box)({
  maxWidth: '80rem',
  margin: '0 auto',
});
