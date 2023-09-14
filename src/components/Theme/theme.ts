import { Theme } from '~/types';

export const darkTheme: Theme = {
  type: 'dark',
  textPrimary: '#ffffff',
  textSecondary: '#99A4B8',
  textDisabled: '#667085', // '#667085
  backgroundPrimary: '#000000',
  backgroundSecondary: '#1A191F',
  borderRadius: '8px',
  secondaryBorderRadius: '4px',
  border: '1px solid rgba(153, 164, 184, 0.1)',
  actionButton: '#ffffff',
  tabColor: '#444CE7',
  relayChipColor: '#05603A',
  relayChipBackground: '#ECFDF3',
};

export const lightTheme: Theme = {
  type: 'light',
  textPrimary: '#101828', // gray-900
  textSecondary: '#344054', // gray-700
  textDisabled: '#667085', // gray-400
  backgroundPrimary: '#ffffff', // gray-100
  backgroundSecondary: '#FCFCFD', // gray-25
  borderRadius: '8px',
  secondaryBorderRadius: '4px',
  border: '1px solid #F2F4F7',
  actionButton: '#444CE7',
  tabColor: '#344054',
  relayChipColor: '#05603A',
  relayChipBackground: '#ECFDF3',
};
