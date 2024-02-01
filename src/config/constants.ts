import { Constants } from '~/types';

const constants: Constants = {
  DEFAULT_THEME: 'dark',
  DEFAULT_CHAIN: 11155111,
  DEFAULT_ETH_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  DEFAULT_WETH_ADDRESS: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  vaultFactoryVersion: 'V1.0.0',

  addresses: {
    AutomationVaultFactory: '0xFfA518751B1489BA60f30274F86C5B2fa67a568b',
    xKeeperMetadata: '0x4208102475d40bE64E8610BA7C87A7F7b961e35d',
    relays: {
      Keep3rRelay: '0x9D11bB1Eb9EF71a62285cc4DDA777b3EbEb80F71',
      Keep3rBondedRelay: '0x8422F45a763a2b608D8a748D52886ab825329d95',
      GelatoRelay: '0x0e35eae5ea725eb86415e99308a460888908753f',
      OpenRelay: '0x5f1e19C9748e99ec382F62F2D0988bB83ea2DF9E',
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
    '5': {
      displayName: 'Goerli',
      name: 'goerli',
      id: 5,
      scanner: 'https://goerli.etherscan.io',
      apiUrl: 'https://api-goerli.etherscan.io/api',
      alchemyUrl: 'https://eth-goerli.alchemyapi.io/v2',
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
