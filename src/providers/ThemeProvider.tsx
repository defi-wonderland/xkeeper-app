import { createContext, useEffect, useMemo, useState } from 'react';

import { Theme, ThemeName } from '~/types';
import { getTheme, themeKey } from '~/utils';
import { getConfig } from '~/config';

type ContextType = {
  theme: ThemeName;
  currentTheme: Theme;
  setTheme: (val: ThemeName) => void;
};

interface StateProps {
  children: React.ReactElement;
}

export const ThemeContext = createContext({} as ContextType);

export const ThemeProvider = ({ children }: StateProps) => {
  const { DEFAULT_THEME } = getConfig();

  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);
  const currentTheme = useMemo(() => getTheme(theme), [theme]);

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
    <ThemeContext.Provider
      value={{
        theme,
        currentTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
