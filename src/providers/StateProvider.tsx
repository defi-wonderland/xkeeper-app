import { createContext, useEffect, useMemo, useState } from 'react';

import { Theme, ThemeName } from '~/types';
import { THEME_KEY, getTheme } from '~/utils';

type ContextType = {
  theme: ThemeName;
  currentTheme: Theme;
  setTheme: (val: ThemeName) => void;

  loading: boolean;
  setLoading: (val: boolean) => void;

  isError: boolean;
  setIsError: (val: boolean) => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const StateContext = createContext({} as ContextType);

export const StateProvider = ({ children }: StateProps) => {
  const [theme, setTheme] = useState<ThemeName>('dark');
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

  const [loading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
