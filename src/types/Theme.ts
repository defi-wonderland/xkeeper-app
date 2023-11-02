export type ThemeName = 'light' | 'dark';

export interface Theme {
  type: ThemeName;

  basicTransition: string;

  textPrimary: string;
  textSecondary: string;
  textTertiary: string;

  textDisabled: string;
  textSecondaryDisabled: string;

  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundHover: string;

  borderRadius: string;
  secondaryBorderRadius: string;
  border: string;
  inputBorder: string;

  actionButton: string;
  actionButtonHover: string;
  actionButtonDisabled: string;
  actionButtonColorDisabled: string;
  actionButtonColor: string;
  tabColor: string;

  inputDisabledBackground: string;

  // Relays Chip
  relayChipColor: string;
  relayChipBackground: string;

  // Address Chip
  addressChipColor: string;
  addressChipBackground: string;
  addressChipIconColor: string;

  // Warning Chip
  warningChipColor: string;
  warningChipBackground: string;

  // Info Chip
  infoChipColor: string;
  infoChipBackground: string;

  backButtonBorderColor: string;

  // Tooltips
  tooltipColor: string;
  tooltipBackground: string;

  // Snackbar
  checkColor: string;
  checkBackground: string;
  checkOutlineColor: string;

  error: string;
  errorBackground: string;
  errorOutlineColor: string;
}

export interface PropTheme {
  theme: Theme;
}
