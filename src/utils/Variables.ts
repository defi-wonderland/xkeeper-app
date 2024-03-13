import { mainnet, sepolia, optimism, optimismSepolia } from 'wagmi/chains';

/*=============================================
=                Misc Variables               =
=============================================*/

export const themeKey = 'xkeeper-app-theme';
export const aliasKey = 'xkeeper-aliases';
export const anyCaller = '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF';
export const itemsPerPage = 7;
export const vaultsPerBatch = 3;

export const supportedChains = [mainnet, sepolia, optimism, optimismSepolia];

/*=============================================
=               Style Variables               =
=============================================*/

export const MOBILE_MAX_WIDTH = 600;
export const TABLET_MAX_WIDTH = 1024;

export const fontSize = {
  MAIN_TITLE: '5.2rem',
  SECTION_TITLE: '2.4rem',
  XL: '1.8rem',
  LARGE: '1.6rem',
  MEDIUM: '1.4rem',
  SMALL: '1.2rem',
};

export const zIndex = {
  HEADER: 100,
  MODAL: 10,
  BACKDROP: -1,
  TOAST: 500,
};
