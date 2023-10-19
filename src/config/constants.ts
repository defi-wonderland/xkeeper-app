import { Constants } from '~/types';

const constants: Constants = {
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
      scanner: 'https://goerli.etherscan.io',
      id: 5,
    },
    '1': {
      displayName: 'Ethereum Mainnet',
      name: 'ethereum',
      scanner: 'https://etherscan.io',
      id: 1,
    },
    '42161': {
      displayName: 'Arbitrum One',
      name: 'arbitrum',
      scanner: 'https://arbiscan.io',
      id: 42161,
    },
    '137': {
      displayName: 'Polygon',
      name: 'polygon',
      scanner: 'https://polygonscan.com',
      id: 137,
    },
    '10': {
      displayName: 'OP Mainnet',
      name: 'optimism',
      scanner: 'https://optimistic.etherscan.io',
      id: 10,
    },
  },
};

export const getConstants = (): Constants => {
  return constants;
};
