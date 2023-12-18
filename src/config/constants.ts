import { Constants } from '~/types';

const constants: Constants = {
  DEFAULT_THEME: 'dark',
  DEFAULT_CHAIN: 5,
  DEFAULT_ETH_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  DEFAULT_WETH_ADDRESS: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',

  addresses: {
    AutomationVaultFactory: '0x5fc2e933e22ac94d7c80fbca7e0a4d150abf0e4c',
    xKeeperMetadata: '0xea3635701bf91e4a0ee3491884579f55b4666e9f',
    relays: {
      GelatoRelay: '0xb32c197e569cc7fb11cbed0cc716635aa7616bae',
      OpenRelay: '0xbd57e761324d09d3a3aea775b9a8566865fea817',
      Keep3rRelay: '0x2055d38a9e14d1f4e16a0efaaf9b6864342510a3',
      // Keep3rBondedRelay: '0x87e49e78b78deb68cb2823e49ab71a74bf9bb5fe',
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
