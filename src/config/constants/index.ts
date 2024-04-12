import { Constants } from '~/types';
import { addresses } from './address';
import { chainData as availableChains } from './chainData';
import { defaultData } from './defaultData';

export const constants: Constants = {
  DEFAULT_THEME: 'dark',
  DEFAULT_CHAIN: 1,
  DEFAULT_ETH_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  vaultFactoryVersion: 'V1.0.0',

  addresses,
  availableChains,
  defaultData,
};

export const getConstants = (): Constants => {
  return constants;
};
