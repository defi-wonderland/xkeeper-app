import { createContext, useEffect, useMemo, useState } from 'react';
import { Address, useAccount } from 'wagmi';

import { Theme, ThemeName, ModalType, Addresses, Chains, VaultData, Notification } from '~/types';
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
  availableChains: Chains;

  selectedItem: { type: string; address: string; params: Address[] | string[] };
  setSelectedItem: (val: { type: string; address: string; params: Address[] | string[] }) => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const { address } = useAccount();

  const [theme, setTheme] = useState<ThemeName>('dark');
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const [notification, setNotification] = useState<Notification>({ open: false });
  const [selectedVault, setSelectedVault] = useState<VaultData>();
  const [selectedItem, setSelectedItem] = useState<{ type: string; address: string; params: string[] }>({
    type: '',
    address: '',
    params: [],
  });

  const [modalOpen, setModalOpen] = useState<ModalType>(ModalType.NONE);
  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const { addresses, availableChains } = getConstants();

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
