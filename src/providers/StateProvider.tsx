import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork, usePublicClient } from 'wagmi';

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
import { ALIAS_KEY, THEME_KEY, getTheme, getTokenList, getVaults, getVaultsData, loadLocalStorage } from '~/utils';
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
  const { addresses, availableChains, DEFAULT_CHAIN } = getConfig();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [theme, setTheme] = useState<ThemeName>('dark');
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
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const currentNetwork = useMemo(
    () => availableChains[chain?.id || DEFAULT_CHAIN],
    [DEFAULT_CHAIN, availableChains, chain?.id],
  );

  const publicClient = usePublicClient({ chainId: currentNetwork.id });

  // Load vaults from blockchain
  const update = useCallback(async () => {
    setLoading(true);
    const tokens = getTokenList(chain?.id);

    const vaults = await getVaults(publicClient, addresses.AutomationVaultFactory);
    const vaultsData = await getVaultsData(publicClient, vaults, tokens);

    setVaults(vaultsData);
    setLoading(false);
  }, [addresses.AutomationVaultFactory, chain?.id, publicClient]);

  // Load alias data from local storage
  const updateAliasData = useCallback(async () => {
    setLoading(true);
    const data = loadLocalStorage(ALIAS_KEY);
    setAliasData(data);

    setLoading(false);
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

  // Load theme from local storage on load
  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as ThemeName;
    if (!storedTheme) {
      localStorage.setItem(THEME_KEY, theme);
    } else {
      setTheme(storedTheme);
    }
  }, []);

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
