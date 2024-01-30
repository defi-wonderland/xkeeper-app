import { Constants } from '~/types';

const constants: Constants = {
  DEFAULT_THEME: 'dark',
  DEFAULT_CHAIN: 5,
  DEFAULT_ETH_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  DEFAULT_WETH_ADDRESS: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  vaultFactoryVersion: 'V1.0.0',

  addresses: {
    AutomationVaultFactory: '0x745b0324c3D05D61F379a22520d06dFC1D28a82e',
    xKeeperMetadata: '0x37d9EEF8c61075C03fC7710175822dAa33Ce3e4b',
    relays: {
      Keep3rRelay: '0x7B4BC4E9304EeaE8B5a4C914B25b0C00FeB6eD29',
      Keep3rBondedRelay: '0x55D10038A1114F341Bd0CDB8a2d61C46eD57149b',
      GelatoRelay: '0x0e35Eae5eA725eB86415e99308a460888908753F',
      OpenRelay: '0xE8E1b32340f527125721903a3947c937dc72e140',
    },
  },

  availableChains: {
    '5': {
      displayName: 'Goerli',
      name: 'goerli',
      id: 5,
      scanner: 'https://goerli.etherscan.io',
      apiUrl: 'https://api-goerli.etherscan.io/api',
      alchemyUrl: 'https://eth-goerli.alchemyapi.io/v2',
    },
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
  },
};

export const getConstants = (): Constants => {
  return constants;
};
