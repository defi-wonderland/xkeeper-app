export type ThemeName = 'light' | 'dark';

export interface Theme {
  type: ThemeName;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  textDisabled: string;
  textSecondaryDisabled: string;

  backgroundPrimary: string;
  backgroundSecondary: string;
  borderRadius: string;
  secondaryBorderRadius: string;
  border: string;
  actionButton: string;
  tabColor: string;

  // Relays Chip
  relayChipColor: string;
  relayChipBackground: string;

  // Address Chip
  addressChipColor: string;
  addressChipBackground: string;
  addressChipIconColor: string;

  // Info Chip
  infoChipColor: string;
  infoChipBackground: string;

  backButtonBorderColor: string;

  // Tooltips
  tooltipColor: string;
  tooltipBackground: string;
}

export interface PropTheme {
  theme: Theme;
}
