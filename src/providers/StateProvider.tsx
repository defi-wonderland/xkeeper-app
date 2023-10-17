import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { Theme, ThemeName, ModalType, Addresses, Chains, VaultData, Notification, Chain, SelectedItem } from '~/types';
import { THEME_KEY, getPrices, getTheme, getTokenList, getVaults, getVaultsData } from '~/utils';
import { getConfig, publicClient } from '~/config';

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

  update: () => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const { addresses, availableChains, DEFAULT_CHAIN, DEFAULT_ETH_ADDRESS } = getConfig();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [theme, setTheme] = useState<ThemeName>('dark');
  const currentTheme = useMemo(() => getTheme(theme), [theme]);
  const [notification, setNotification] = useState<Notification>({ open: false });
  const [selectedVault, setSelectedVault] = useState<VaultData>();
  const [vaults, setVaults] = useState<VaultData[]>([]);
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

  const update = useCallback(async () => {
    setLoading(true);
    const tokens = getTokenList(chain?.id);
    const tokenAddresses = [...tokens.map((token) => token.address), DEFAULT_ETH_ADDRESS];

    const currentChain = publicClient.chain.name.toLocaleLowerCase();
    const chainName = currentChain === 'goerli' ? 'ethereum' : currentChain; // Load tokens from mainnet when on goerli

    const pricesCall = getPrices(chainName, tokenAddresses);
    const vaultsCall = getVaults(publicClient, addresses.AutomationVaultFactory);

    const [vaults, prices] = await Promise.all([vaultsCall, pricesCall]);
    const vaultsData = await getVaultsData(publicClient, vaults, tokens, prices);

    setVaults(vaultsData);
    setLoading(false);
  }, [DEFAULT_ETH_ADDRESS, addresses.AutomationVaultFactory, chain?.id]);

  useEffect(() => {
    update();
  }, [update]);

  useEffect(() => {
    if (notification.open) {
      update();
    }
  }, [notification.open, update]);

  // Load theme from local storage
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
