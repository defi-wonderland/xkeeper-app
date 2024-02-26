import { Constants } from '~/types';

const constants: Constants = {
  DEFAULT_THEME: 'dark',
  DEFAULT_CHAIN: 11155111,
  DEFAULT_ETH_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  DEFAULT_WETH_ADDRESS: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  vaultFactoryVersion: 'V1.0.0',

  addresses: {
    AutomationVaultFactory: '0xe1D23cc6F3415d425005454983d4B150786c9240',
    xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
    relays: {
      Keep3rRelay: '0x06a909dB922eC583B9f3D1597bCE42C97f2371Fb',
      Keep3rBondedRelay: '0xBa6CA456a5E17E6387a233fA14Bf33eefA165ddE',
      GelatoRelay: '0x29CB3097985b4A3bBe34AFfcE61A4eAC9FE13317',
      OpenRelay: '0x21a3C0E82aFB836B68b9C857901A3fE38352347A',
    },
  },

  availableChains: {
    '1': {
      displayName: 'Ethereum Mainnet',
      name: 'ethereum',
      id: 1,
      scanner: 'https://etherscan.io',
      apiUrl: 'https://api.etherscan.io/api',
      alchemyUrl: 'https://eth-mainnet.alchemyapi.io/v2',
    },
    '42161': {
      displayName: 'Arbitrum One',
      name: 'arbitrum',
      id: 42161,
      scanner: 'https://arbiscan.io',
      apiUrl: 'https://api.arbiscan.io/api',
      alchemyUrl: 'https://arb-mainnet.g.alchemy.com/v2',
    },
    '137': {
      displayName: 'Polygon',
      name: 'polygon',
      id: 137,
      scanner: 'https://polygonscan.com',
      apiUrl: 'https://api.polygonscan.com/api',
      alchemyUrl: 'https://polygon-mainnet.g.alchemy.com/v2',
    },
    '10': {
      displayName: 'OP Mainnet',
      name: 'optimism',
      id: 10,
      scanner: 'https://optimistic.etherscan.io',
      apiUrl: 'https://api-optimistic.etherscan.io/api',
      alchemyUrl: 'https://optimism-mainnet.g.alchemy.com/v2',
    },
    '11155111': {
      displayName: 'Sepolia',
      name: 'sepolia',
      id: 11155111,
      scanner: 'https://sepolia.etherscan.io',
      apiUrl: 'https://api-sepolia.etherscan.io/api',
      alchemyUrl: 'https://eth-sepolia.g.alchemy.com/v2',
    },
  },
};

export const getConstants = (): Constants => {
  return constants;
};
