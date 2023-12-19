import { ThemeProvider } from 'styled-components';
import { useTheme } from '~/hooks';

import { getTheme } from '~/utils';

interface ThemableProps {
  children: React.ReactNode;
}

export const Themable = ({ children }: ThemableProps) => {
  const { theme: themeName } = useTheme();
  const theme = getTheme(themeName);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
