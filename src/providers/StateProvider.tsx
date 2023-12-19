import { createContext, useCallback, useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { ModalType, Addresses, Chains, VaultData, Notification, Chain, SelectedItem } from '~/types';
import { getPrices, getTokenList, getVaults, getVaultsData, getTotalVaults } from '~/utils';
import { getConfig } from '~/config';
import { useCustomClient } from '~/hooks';
import { useModal } from '~/hooks';

type ContextType = {
  loading: boolean;
  setLoading: (val: boolean) => void;

  isError: boolean;
  setIsError: (val: boolean) => void;

  notification: Notification;
  setNotification: (val: Notification) => void;

  selectedVault?: VaultData;
  setSelectedVault: (val: VaultData) => void;

  userAddress?: string;
  addresses: Addresses;

  currentNetwork: Chain;
  setCurrentNetwork: (val: Chain) => void;

  availableChains: Chains;

  selectedItem: SelectedItem;
  setSelectedItem: (val: SelectedItem) => void;

  vaults: VaultData[];
  setVaults: (val: VaultData[]) => void;

  updateVaults: () => Promise<void>;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const { addresses, availableChains, DEFAULT_CHAIN, DEFAULT_WETH_ADDRESS, TEST_MODE: IS_TEST } = getConfig();
  const { publicClient } = useCustomClient();
  const { modalOpen } = useModal();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const chainId = IS_TEST ? DEFAULT_CHAIN : chain?.id || DEFAULT_CHAIN;

  const [notification, setNotification] = useState<Notification>({ open: false });
  const [selectedVault, setSelectedVault] = useState<VaultData>();
  const [vaults, setVaults] = useState<VaultData[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: '',
    address: '0x',
    params: [],
  });

  const REQUESTS_AMOUNT = 3;
  const [totalRequestCount, setTotalRequestCount] = useState<number>();
  const [requestAmount, setRequestAmount] = useState<number>(REQUESTS_AMOUNT);

  const [currentNetwork, setCurrentNetwork] = useState<Chain>(availableChains[chainId]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const loadData = useCallback(
    async (startIndex: number, amountOfVaults: number) => {
      const tokens = getTokenList(currentNetwork.id);
      const tokenAddresses = [...tokens.map((token) => token.address), DEFAULT_WETH_ADDRESS];

      const chainName =
        publicClient.chain.name.toLowerCase() === 'goerli' ? 'ethereum' : publicClient.chain.name.toLowerCase();
      const prices = await getPrices(chainName, tokenAddresses);
      const vaultsData = await getVaults(publicClient, addresses.AutomationVaultFactory, startIndex, amountOfVaults);
      const formattedVaultsData = await getVaultsData(
        publicClient,
        vaultsData,
        tokens,
        prices,
        addresses.xKeeperMetadata,
      );

      return formattedVaultsData;
    },
    [
      DEFAULT_WETH_ADDRESS,
      addresses.AutomationVaultFactory,
      addresses.xKeeperMetadata,
      currentNetwork.id,
      publicClient,
    ],
  );

  const fetchData = useCallback(
    async (startIndex: number, requestAmount: number) => {
      setLoading(true);

      try {
        if (requestAmount === 0) {
          setLoading(false);
          return [];
        }

        const formattedVaultsData = await loadData(startIndex, requestAmount);

        const newTotalRequestCount = Math.max(startIndex - requestAmount, 0);
        const newAmount = newTotalRequestCount === 0 ? startIndex : requestAmount;
        setTotalRequestCount(newTotalRequestCount);
        setRequestAmount(newAmount);

        setLoading(false);
        return formattedVaultsData;
      } catch (error) {
        console.error('Error loading vaults:', error);
        setLoading(false);
        return [];
      }
    },
    [loadData],
  );

  const updateVaults = useCallback(async () => {
    if (typeof totalRequestCount !== 'number') return;
    const newData = await fetchData(totalRequestCount!, requestAmount);
    setVaults((prevVaults) => [...prevVaults, ...newData]);
  }, [fetchData, requestAmount, totalRequestCount]);

  const handleLoad = useCallback(
    async (reset?: boolean) => {
      try {
        if ((!totalRequestCount && !vaults.length) || reset) {
          setLoading(true);
          const totalRequestCount = await getTotalVaults(publicClient, addresses.AutomationVaultFactory);
          const newRequestAmount = Math.min(REQUESTS_AMOUNT, totalRequestCount);

          const newData = await fetchData(totalRequestCount - newRequestAmount, newRequestAmount);
          setVaults(newData);
        }
      } catch (error) {
        console.error('Error getting last requests:', error);
        setLoading(false);
        setIsError(true);
      }
    },
    // to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addresses.AutomationVaultFactory, fetchData],
  );

  const resetVaults = useCallback(() => {
    setTotalRequestCount(undefined);
    setRequestAmount(REQUESTS_AMOUNT);
    setVaults([]);
  }, []);

  // Load vaults on load
  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  // Update current network when chain changes
  useEffect(() => {
    if (chain?.id) setCurrentNetwork(availableChains[chainId]);
  }, [DEFAULT_CHAIN, availableChains, chain, chain?.id, chainId]);

  // Reset vaults when network changes
  useEffect(() => {
    setVaults([]);
  }, [currentNetwork]);

  // Update vaults on notification open
  useEffect(() => {
    if (notification.open) {
      resetVaults();
      handleLoad(true);
    }
  }, [handleLoad, notification.open, resetVaults]);

  // Reset selected item when modal is close
  useEffect(() => {
    if (modalOpen === ModalType.NONE) {
      setSelectedItem({
        type: '',
        address: '0x',
        params: [],
      });
    }
  }, [modalOpen]);

  return (
    <StateContext.Provider
      value={{
        loading,
        setLoading,
        isError,
        setIsError,
        notification,
        setNotification,
        userAddress: address,
        addresses,
        currentNetwork,
        setCurrentNetwork,
        availableChains,
        selectedVault,
        setSelectedVault,
        selectedItem,
        setSelectedItem,
        vaults,
        setVaults,

        updateVaults,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
