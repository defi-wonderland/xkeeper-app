import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import {
  Theme,
  ThemeName,
  ModalType,
  Addresses,
  Chains,
  VaultData,
  Notification,
  Chain,
  SelectedItem,
  AliasData,
} from '~/types';
import {
  aliasKey,
  themeKey,
  getPrices,
  getTheme,
  getTokenList,
  getVaults,
  getVaultsData,
  loadLocalStorage,
  getCustomClient,
} from '~/utils';
import { getConfig } from '~/config';

type ContextType = {
  theme: ThemeName;
  currentTheme: Theme;
  setTheme: (val: ThemeName) => void;

  loading: boolean;
  setLoading: (val: boolean) => void;

  isError: boolean;
  setIsError: (val: boolean) => void;

  notification: Notification;
  setNotification: (val: Notification) => void;

  modalOpen: ModalType;
  setModalOpen: (val: ModalType) => void;

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

  aliasData: AliasData;
  updateAliasData: () => void;

  update: () => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const { addresses, availableChains, DEFAULT_CHAIN, DEFAULT_WETH_ADDRESS, DEFAULT_THEME } = getConfig();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);
  const currentTheme = useMemo(() => getTheme(theme), [theme]);
  const [notification, setNotification] = useState<Notification>({ open: false });
  const [selectedVault, setSelectedVault] = useState<VaultData>();
  const [vaults, setVaults] = useState<VaultData[]>([]);
  const [aliasData, setAliasData] = useState<AliasData>({});
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: '',
    address: '0x',
    params: [],
  });

  const [modalOpen, setModalOpen] = useState<ModalType>(ModalType.NONE);
  const [currentNetwork, setCurrentNetwork] = useState<Chain>(availableChains[chain?.id || DEFAULT_CHAIN]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const update = useCallback(async () => {
    const publicClient = getCustomClient(currentNetwork.id, address);

    if (!publicClient) {
      return;
    }
    setLoading(true);
    const tokens = getTokenList(currentNetwork.id);
    const tokenAddresses = [...tokens.map((token) => token.address), DEFAULT_WETH_ADDRESS];

    const currentChain = publicClient.chain.name.toLocaleLowerCase();
    const chainName = currentChain === 'goerli' ? 'ethereum' : currentChain; // Load tokens from mainnet when on goerli

    const pricesCall = getPrices(chainName, tokenAddresses);
    const vaultsCall = getVaults(publicClient, addresses.AutomationVaultFactory);

    const [vaults, prices] = await Promise.all([vaultsCall, pricesCall]);
    const vaultsData = await getVaultsData(publicClient, vaults, tokens, prices);

    setVaults(vaultsData);
    setLoading(false);
  }, [DEFAULT_WETH_ADDRESS, address, addresses.AutomationVaultFactory, currentNetwork?.id]);

  // Update current network when chain changes
  useEffect(() => {
    if (chain?.id) setCurrentNetwork(availableChains[chain?.id] || availableChains[DEFAULT_CHAIN]);
  }, [DEFAULT_CHAIN, availableChains, chain, chain?.id]);

  // Reset vaults when network changes
  useEffect(() => {
    setVaults([]);
  }, [currentNetwork]);

  // Load alias data from local storage
  const updateAliasData = useCallback(async () => {
    const data = loadLocalStorage(aliasKey);
    setAliasData(data);
  }, []);

  // Load vaults on load
  useEffect(() => {
    update();
  }, [update]);

  // Load alias data on load
  useEffect(() => {
    updateAliasData();
  }, [updateAliasData]);

  // Update vaults on notification open
  useEffect(() => {
    if (notification.open) {
      update();
    }
  }, [notification.open, update]);

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

  // Load theme from local storage on load
  useEffect(() => {
    const storedTheme = localStorage.getItem(themeKey) as ThemeName;
    if (!storedTheme) {
      localStorage.setItem(themeKey, DEFAULT_THEME);
    } else {
      setTheme(storedTheme);
    }
  }, [DEFAULT_THEME]);

  return (
    <StateContext.Provider
      value={{
        theme,
        setTheme,
        loading,
        setLoading,
        isError,
        setIsError,
        currentTheme,
        notification,
        setNotification,
        modalOpen,
        setModalOpen,
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
        update,
        aliasData,
        updateAliasData,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
