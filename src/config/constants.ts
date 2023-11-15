import { Constants } from '~/types';

const constants: Constants = {
  DEFAULT_THEME: 'dark',
  DEFAULT_CHAIN: 5,
  DEFAULT_ETH_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  DEFAULT_WETH_ADDRESS: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',

  addresses: {
    AutomationVaultFactory: '0x49f06CfB7e9505b5a704Ca24E4674aa7B1A81D96',
    relays: {
      GelatoRelay: '0x74E1b9F9b1Df2fdE9E05bA03e62C0074f383cabB',
      OpenRelay: '0x217742801feBB8220FdEA5D35dD976988a052BEa',
      Keep3rRelay: '0xcb3eBC14B351F7e9924420b4AFFBCFf1F3F25Fc0',
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
