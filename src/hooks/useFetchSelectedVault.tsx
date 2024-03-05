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
  const { selectedVault, notification, setSelectedVault, currentNetwork } = useStateContext();
  const publicClient = usePublicClient();
  const { DEFAULT_ETH_ADDRESS, addresses } = getConfig();

  const { address } = useParams();
  const [requestStatus, setRequestStatus] = useState(Status.IDLE);

  const loadSelectedVault = useCallback(async () => {
    try {
      const tokens = getTokenList(currentNetwork?.id);
      const tokenAddressList = [...tokens.map((token) => token.address), DEFAULT_ETH_ADDRESS];
      const chainName = getChainName(publicClient);

      const prices = await getPrices(chainName, tokenAddressList);
      const vaultData = await getVaultsData(
        publicClient,
        [address as Address],
        tokens,
        prices,
        addresses[currentNetwork?.id].xKeeperMetadata,
      );

      setSelectedVault(vaultData[0]);
    } catch (error) {
      console.error(`Error loading vault ${address}:`, error);
    }
  }, [DEFAULT_ETH_ADDRESS, address, addresses, currentNetwork?.id, publicClient, setSelectedVault]);

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
