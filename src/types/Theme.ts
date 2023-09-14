export type ThemeName = 'light' | 'dark';

export interface Theme {
  type: ThemeName;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  borderRadius: string;
  secondaryBorderRadius: string;
  border: string;
  actionButton: string;
  tabColor: string;
  relayChipColor: string;
  relayChipBackground: string;
}

export interface PropTheme {
  theme: Theme;
}
