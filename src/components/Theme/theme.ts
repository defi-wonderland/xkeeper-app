import { Theme } from '~/types';

export const darkTheme: Theme = {
  type: 'dark',
  textPrimary: '#ffffff',
  textSecondary: '#99A4B8',
  textTertiary: '#667085',
  textDisabled: '#667085',
  textSecondaryDisabled: '#475467', // gray-600

  backgroundPrimary: '#000000',
  backgroundSecondary: '#1A191F',
  borderRadius: '8px',
  secondaryBorderRadius: '4px',
  border: '1px solid rgba(153, 164, 184, 0.1)',
  actionButton: '#ffffff',
  tabColor: '#444CE7',

  relayChipColor: '#05603A',
  relayChipBackground: '#ECFDF3',

  addressChipColor: '#D0D5DD', // gray-300
  addressChipBackground: '#1D2939', // gray-800
  addressChipIconColor: '#667085', // gray-500

  infoChipColor: '#8098F9', // indigo-450
  infoChipBackground: '#1B1F52', // indigo-950

  backButtonBorderColor: '#344054', // gray-700

  tooltipColor: '#ffffff',
  tooltipBackground: '#1D2939',
};

export const lightTheme: Theme = {
  type: 'light',
  textPrimary: '#101828', // gray-900
  textSecondary: '#344054', // gray-700
  textTertiary: '#667085', // gray-500
  textDisabled: '#98A2B3', // gray-400
  textSecondaryDisabled: '#D0D5DD', // gray-300
  backgroundPrimary: '#ffffff', // gray-100
  backgroundSecondary: '#FCFCFD', // gray-25
  borderRadius: '8px',
  secondaryBorderRadius: '4px',
  border: '1px solid #F2F4F7',
  actionButton: '#444CE7',
  tabColor: '#344054',

  relayChipColor: '#05603A',
  relayChipBackground: '#ECFDF3',

  addressChipColor: '#475467', // gray-600
  addressChipBackground: '#F2F4F7', // gray-100
  addressChipIconColor: '#98A2B3', // gray-400

  infoChipColor: '#444CE7', // indigo-600
  infoChipBackground: '#EEF4FF', // indigo-50

  backButtonBorderColor: '#EAECF0', // gray-200

  tooltipColor: '#ffffff',
  tooltipBackground: '#1D2939',
};
