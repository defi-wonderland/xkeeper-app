import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Address, useNetwork } from 'wagmi';

import { useStateContext, useCustomClient } from '~/hooks';
import { getPrices, getTokenList, getVaultsData } from '~/utils';
import { getConfig } from '~/config';
import { Status } from '~/types';

/**
 * Fetch selected vault data
 * @returns {Status} requestStatus - Request status
 * @returns {VaultData} data - Vault data
 */
export const useFetchSelectedVault = () => {
  const { selectedVault, notification, setSelectedVault } = useStateContext();
  const { publicClient } = useCustomClient();
  const {
    DEFAULT_WETH_ADDRESS,
    addresses: { xKeeperMetadata },
  } = getConfig();

  const { address } = useParams();
  const { chain } = useNetwork();
  const [requestStatus, setRequestStatus] = useState(Status.IDLE);

  const loadSelectedVault = useCallback(async () => {
    try {
      const tokens = getTokenList(chain?.id);
      const tokenAddressList = [...tokens.map((token) => token.address), DEFAULT_WETH_ADDRESS];

      const currentChain = publicClient.chain.name.toLocaleLowerCase();
      // Load tokens from mainnet when on goerli
      const chainName = currentChain === 'goerli' ? 'ethereum' : currentChain;

      const prices = await getPrices(chainName, tokenAddressList);
      const vaultData = await getVaultsData(publicClient, [address as Address], tokens, prices, xKeeperMetadata);

      setSelectedVault(vaultData[0]);
    } catch (error) {
      console.error(`Error loading vault ${address}:`, error);
    }
  }, [DEFAULT_WETH_ADDRESS, address, chain?.id, publicClient, setSelectedVault, xKeeperMetadata]);

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
