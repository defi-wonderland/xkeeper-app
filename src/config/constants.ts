import { Constants } from '~/types';

const constants: Constants = {
  DEFAULT_THEME: 'dark',
  DEFAULT_CHAIN: 11155111,
  DEFAULT_ETH_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  DEFAULT_WETH_ADDRESS: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  vaultFactoryVersion: 'V1.0.0',

  addresses: {
    '11155111': {
      AutomationVaultFactory: '0xa9C4c7295519C8aE3A69D6d84252de6948666bd4',
      relays: {
        GelatoRelay: '0xe012118BA9678ceB3B7104C9bD7cc6b8Cf0a90DC',
        Keep3rRelay: '0xB0CB8E6Fe8F655d46eE0910332C263ddB61FF9a0',
        Keep3rBondedRelay: '0xaDe1cE131609702FdDb68f6142fc1c74f80F4c5f',
        OpenRelay: '0xc461d22DCDd8538E8025AAfA439B5BddA8C69B15',
      },
      xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
    },
    '10': {
      AutomationVaultFactory: '0xa9C4c7295519C8aE3A69D6d84252de6948666bd4',
      relays: {
        GelatoRelay: '0xe012118BA9678ceB3B7104C9bD7cc6b8Cf0a90DC',
        OpenRelay: '0xc461d22DCDd8538E8025AAfA439B5BddA8C69B15',
        Keep3rRelay: '0xfACd8867002605d16DaEb87955F443EE53a0893b',
        Keep3rBondedRelay: '0x10Ddf0A7051e238311A1b858acA26C4115f1c3EF',
      },
      xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
    },
    '137': {
      AutomationVaultFactory: '0xa9C4c7295519C8aE3A69D6d84252de6948666bd4',
      relays: {
        GelatoRelay: '0xe012118BA9678ceB3B7104C9bD7cc6b8Cf0a90DC',
        OpenRelay: '0xc461d22DCDd8538E8025AAfA439B5BddA8C69B15',
        Keep3rRelay: '0xfACd8867002605d16DaEb87955F443EE53a0893b',
        Keep3rBondedRelay: '0x10Ddf0A7051e238311A1b858acA26C4115f1c3EF',
      },
      xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
    },
    '1': {
      AutomationVaultFactory: '0xa9C4c7295519C8aE3A69D6d84252de6948666bd4',
      relays: {
        GelatoRelay: '0xe012118BA9678ceB3B7104C9bD7cc6b8Cf0a90DC',
        OpenRelay: '0xc461d22DCDd8538E8025AAfA439B5BddA8C69B15',
        Keep3rRelay: '0xeBe2B03A83FAF02C0f4f113E6C85a3A95f107E51',
        Keep3rBondedRelay: '0x5b564DA8EA72b79676EA9a6571DA0d62D29B6AA2',
      },
      xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
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
