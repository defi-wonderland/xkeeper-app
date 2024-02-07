import merge from 'lodash.merge';
import { darkTheme, Theme as RainbowTheme, lightTheme } from '@rainbow-me/rainbowkit';
import { Theme } from '~/types';

export const customTheme = (theme: Theme) => {
  return merge(theme.type === 'dark' ? darkTheme() : lightTheme(), {
    blurs: {
      // modalOverlay: '...',
    },
    colors: {
      accentColor: theme.actionButton,
      accentColorForeground: theme.actionButtonColor,
      // actionButtonBorder: '...',
      // actionButtonBorderMobile: '...',
      // actionButtonSecondaryBackground: '...',
      // closeButton: '...',
      // closeButtonBackground: '...',
      // connectButtonBackground: '...',
      // connectButtonBackgroundError: '...',
      // connectButtonInnerBackground: '...',
      // connectButtonText: '...',
      // connectButtonTextError: '...',
      // connectionIndicator: '...',
      // downloadBottomCardBackground: '...',
      // downloadTopCardBackground: '...',
      // error: '...',
      // generalBorder: '...',
      // generalBorderDim: '...',
      // menuItemBackground: '...',
      // modalBackdrop: '...',
      modalBackground: theme.backgroundPrimary,
      // modalBorder: '...',
      modalText: theme.textPrimary,
      // modalTextDim: '...',
      // modalTextSecondary: '...',
      // profileAction: '...',
      // profileActionHover: '...',
      // profileForeground: '...',
      // selectedOptionBorder: '...',
      // standby: '...',
    },
    fonts: {
      body: 'Inter',
    },
    radii: {
      // actionButton: '...',
      // connectButton: '...',
      // menuButton: '...',
      modal: theme.borderRadius,
      // modalMobile: '...',
    },
    shadows: {
      connectButton: 'none',
      // dialog: '...',
      // profileDetailsAction: '...',
      // selectedOption: '...',
      // selectedWallet: '...',
      // walletLogo: '...',
    },
  } as RainbowTheme);
};
