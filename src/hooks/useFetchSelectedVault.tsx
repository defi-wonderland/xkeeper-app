import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Address, usePublicClient } from 'wagmi';

import { useStateContext } from '~/hooks';
import { getChainName, getPrices, getTokenList, getVaultsData } from '~/utils';
import { getConfig } from '~/config';
import { Status } from '~/types';

/**
 * Fetch selected vault data
 * @returns {Status} requestStatus - Request status
 * @returns {VaultData} data - Vault data
 */
export const useFetchSelectedVault = () => {
  const { selectedVault, notification, setSelectedVault, availableChains, setCurrentNetwork } = useStateContext();
  const { DEFAULT_CHAIN } = getConfig();
  const { address, chain } = useParams();

  const chainId = Object.values(availableChains).find((c) => c.name === chain)?.id;
  const publicClient = usePublicClient({
    chainId,
  });

  const { DEFAULT_ETH_ADDRESS, addresses } = getConfig();
  const [requestStatus, setRequestStatus] = useState(Status.IDLE);

  const loadSelectedVault = useCallback(async () => {
    try {
      setCurrentNetwork(availableChains[chainId || DEFAULT_CHAIN]);
      const tokens = getTokenList(chainId);
      const tokenAddressList = [...tokens.map((token) => token.address), DEFAULT_ETH_ADDRESS];
      const chainName = getChainName(publicClient);

      const prices = await getPrices(chainName, tokenAddressList);
      const vaultData = await getVaultsData(
        publicClient,
        [address as Address],
        tokens,
        prices,
        addresses[chainId || DEFAULT_CHAIN].xKeeperMetadata,
      );

      setSelectedVault(vaultData[0]);
    } catch (error) {
      console.error(`Error loading vault ${address}:`, error);
    }
  }, [
    DEFAULT_CHAIN,
    DEFAULT_ETH_ADDRESS,
    address,
    addresses,
    availableChains,
    chainId,
    publicClient,
    setCurrentNetwork,
    setSelectedVault,
  ]);

  // Load vault data when there is no selected vault
  useEffect(() => {
    if (!selectedVault?.address) {
      setRequestStatus(Status.LOADING);
      loadSelectedVault()
        .then(() => setRequestStatus(Status.SUCCESS))
        .catch((err) => {
          setRequestStatus(Status.ERROR);
          console.error('Error loading vault:', err);
        });
    }
  }, [loadSelectedVault, selectedVault?.address]);

  // Reload vault data when a transaction is confirmed
  useEffect(() => {
    if (notification.open) {
      loadSelectedVault();
    }
  }, [loadSelectedVault, notification.open]);

  return { requestStatus, data: selectedVault };
};
