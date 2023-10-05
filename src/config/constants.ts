import { Constants } from '~/types';

const constants: Constants = {
  DEFAULT_CHAIN: 1,

  addresses: {
    AutomationVaultFactory: '0x49f06CfB7e9505b5a704Ca24E4674aa7B1A81D96',
    GelatoRelay: '0x74e1b9f9b1df2fde9e05ba03e62c0074f383cabb',
    OpenRelay: '0x217742801febb8220fdea5d35dd976988a052bea',
    Keep3rRelay: '0xcb3ebc14b351f7e9924420b4affbcff1f3f25fc0',
  },

  availableChains: {
    '5': {
      name: 'Goerli',
      iconName: 'goerli',
    },
    '1': {
      name: 'Ethereum Mainnet',
      iconName: 'ethereum',
    },
    '42161': {
      name: 'Arbitrum One',
      iconName: 'arbitrum',
    },
    '137': {
      name: 'Polygon',
      iconName: 'polygon',
    },
    '10': {
      name: 'OP Mainnet',
      iconName: 'optimism',
    },
  },
};

export const getConstants = (): Constants => {
  return constants;
};
