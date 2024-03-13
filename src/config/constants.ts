import { Constants } from '~/types';

const constants: Constants = {
  DEFAULT_THEME: 'dark',
  DEFAULT_CHAIN: 1,
  DEFAULT_ETH_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  vaultFactoryVersion: 'V1.0.0',

  addresses: {
    '1': {
      AutomationVaultFactory: '0xa9C4c7295519C8aE3A69D6d84252de6948666bd4',
      xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
      relays: {
        GelatoRelay: '0xe012118BA9678ceB3B7104C9bD7cc6b8Cf0a90DC',
        OpenRelay: '0xc461d22DCDd8538E8025AAfA439B5BddA8C69B15',
        Keep3rRelay: '0xeBe2B03A83FAF02C0f4f113E6C85a3A95f107E51',
        Keep3rBondedRelay: '0x5b564DA8EA72b79676EA9a6571DA0d62D29B6AA2',
      },
    },
    '10': {
      AutomationVaultFactory: '0xa9C4c7295519C8aE3A69D6d84252de6948666bd4',
      xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
      relays: {
        GelatoRelay: '0xe012118BA9678ceB3B7104C9bD7cc6b8Cf0a90DC',
        OpenRelay: '0xc461d22DCDd8538E8025AAfA439B5BddA8C69B15',
        Keep3rRelay: '0xfACd8867002605d16DaEb87955F443EE53a0893b',
        Keep3rBondedRelay: '0x10Ddf0A7051e238311A1b858acA26C4115f1c3EF',
      },
    },
    '11155111': {
      AutomationVaultFactory: '0xa9C4c7295519C8aE3A69D6d84252de6948666bd4',
      xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
      relays: {
        GelatoRelay: '0xe012118BA9678ceB3B7104C9bD7cc6b8Cf0a90DC',
        Keep3rRelay: '0xB0CB8E6Fe8F655d46eE0910332C263ddB61FF9a0',
        Keep3rBondedRelay: '0xaDe1cE131609702FdDb68f6142fc1c74f80F4c5f',
        OpenRelay: '0xc461d22DCDd8538E8025AAfA439B5BddA8C69B15',
      },
    },
    '11155420': {
      AutomationVaultFactory: '0xa9C4c7295519C8aE3A69D6d84252de6948666bd4',
      xKeeperMetadata: '0x96f57C654f07dda2B7d65dD98150158Bd5d764db',
      relays: {
        GelatoRelay: '0xe012118BA9678ceB3B7104C9bD7cc6b8Cf0a90DC',
        Keep3rRelay: '0x6646329894ab2E6C9F5352A9D915c6c47bA9B6F9',
        Keep3rBondedRelay: '0x2Ec285BAf76bEF03AF55CdC6eeAd6EfE6AB762d8',
        OpenRelay: '0xc461d22DCDd8538E8025AAfA439B5BddA8C69B15',
      },
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
      nativeToken: {
        symbol: 'ETH',
        name: 'Ether',
      },
    },
    '10': {
      displayName: 'OP Mainnet',
      name: 'optimism',
      id: 10,
      scanner: 'https://optimistic.etherscan.io',
      apiUrl: 'https://api-optimistic.etherscan.io/api',
      alchemyUrl: 'https://optimism-mainnet.g.alchemy.com/v2',
      nativeToken: {
        symbol: 'ETH',
        name: 'Ether',
      },
    },
    '11155111': {
      displayName: 'Sepolia',
      name: 'sepolia',
      id: 11155111,
      scanner: 'https://sepolia.etherscan.io',
      apiUrl: 'https://api-sepolia.etherscan.io/api',
      alchemyUrl: 'https://eth-sepolia.g.alchemy.com/v2',
      nativeToken: {
        symbol: 'ETH',
        name: 'Ether',
      },
    },
    '11155420': {
      displayName: 'OP Sepolia',
      name: 'op-sepolia',
      id: 11155420,
      scanner: 'https://sepolia-optimism.etherscan.io/',
      apiUrl: 'https://api-sepolia-optimistic.etherscan.io/api',
      alchemyUrl: 'https://opt-sepolia.g.alchemy.com/v2',
      nativeToken: {
        symbol: 'ETH',
        name: 'Ether',
      },
    },
  },
};

export const getConstants = (): Constants => {
  return constants;
};
