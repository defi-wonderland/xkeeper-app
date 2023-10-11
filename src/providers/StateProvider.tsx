import { createContext, useEffect, useMemo, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { Theme, ThemeName, ModalType, Addresses, Chains, VaultData, Notification, Chain, SelectedItem } from '~/types';
import { getConstants } from '~/config/constants';
import { THEME_KEY, getTheme } from '~/utils';

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
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const [theme, setTheme] = useState<ThemeName>('dark');
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const [notification, setNotification] = useState<Notification>({ open: false });
  const [selectedVault, setSelectedVault] = useState<VaultData>();
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    type: '',
    address: '0x',
    params: [],
  });

  const [modalOpen, setModalOpen] = useState<ModalType>(ModalType.NONE);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { addresses, availableChains, DEFAULT_CHAIN } = getConstants();

  const currentNetwork = useMemo(
    () => availableChains[chain?.id || DEFAULT_CHAIN],
    [DEFAULT_CHAIN, availableChains, chain?.id],
  );

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
