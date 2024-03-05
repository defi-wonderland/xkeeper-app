import { useCallback, useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';

import { useStateContext } from '~/hooks';
import { getVaultEvents } from '~/utils';
import { EventData, Status } from '~/types';

/**
 * Fetch vault events
 * @returns {Status} requestStatus - Request status
 * @returns {EventData} data - Vault activity data
 */
export const useFetchVaultActivity = () => {
  const { selectedVault, vaults, setVaults, setSelectedVault } = useStateContext();
  const publicClient = usePublicClient();
  const [requestStatus, setRequestStatus] = useState(Status.LOADING);
  const [events, setEvents] = useState<EventData[]>(selectedVault?.events || []);

  // Update vault events data in vaults array
  const updateVaultEvents = useCallback(() => {
    const updatedVaults = vaults?.map((vault) => {
      if (vault.address === selectedVault?.address) {
        const newSelectedVaultData = { ...selectedVault, events };
        setSelectedVault(newSelectedVaultData);
        return newSelectedVaultData;
      }
      return vault;
    });
    setVaults(updatedVaults);

    // This is needed to avoid infinite loop when events are updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, selectedVault, setVaults]);

  // Load events when there are no events loaded in the selected vault
  const getEvents = useCallback(async () => {
    if (selectedVault?.events?.length) return;
    const events = await getVaultEvents(publicClient, 0n, selectedVault?.address);

    setEvents(events.reverse()); // Reverse to show latest events first
  }, [publicClient, selectedVault?.address, selectedVault?.events?.length]);

  useEffect(() => {
    setRequestStatus(Status.LOADING);
    getEvents()
      .then(() => setRequestStatus(Status.SUCCESS))
      .catch((err) => {
        setRequestStatus(Status.ERROR);
        console.error('Error loading activity:', err);
      });
  }, [getEvents]);

  // Update vaults data when events are loaded
  useEffect(() => {
    if (events.length && !selectedVault?.events?.length) {
      updateVaultEvents();
    }
  }, [events, selectedVault?.events?.length, updateVaultEvents]);

  return { requestStatus, data: events };
};
