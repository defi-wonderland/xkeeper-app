import { RelayData } from '~/types';
import { addresses } from './address';

export type DefaultData = {
  [chainId: string]: RelayData;
};
export const defaultData: DefaultData = {
  '1': {
    [addresses['1'].relays.Keep3rRelay]: {
      callers: [],
      jobsData: [{ job: addresses['1'].keep3rV2, functionSelectors: ['0x5feeb794', '0x6ba42aaa'] }],
    },
    [addresses['1'].relays.Keep3rBondedRelay]: {
      callers: [],
      jobsData: [{ job: addresses['1'].keep3rV2, functionSelectors: ['0x5feeb794', '0x6ba42aaa'] }],
    },
  },
  '10': {
    [addresses['10'].relays.Keep3rRelay]: {
      callers: [],
      jobsData: [{ job: addresses['10'].keep3rV2, functionSelectors: ['0xb70362b9', '0x6ba42aaa'] }],
    },
    [addresses['10'].relays.Keep3rBondedRelay]: {
      callers: [],
      jobsData: [{ job: addresses['10'].keep3rV2, functionSelectors: ['0xb70362b9', '0x6ba42aaa'] }],
    },
  },
  '11155111': {
    [addresses['11155111'].relays.Keep3rRelay]: {
      callers: [],
      jobsData: [{ job: addresses['11155111'].keep3rV2, functionSelectors: ['0x5feeb794', '0x6ba42aaa'] }],
    },
    [addresses['11155111'].relays.Keep3rBondedRelay]: {
      callers: [],
      jobsData: [{ job: addresses['11155111'].keep3rV2, functionSelectors: ['0x5feeb794', '0x6ba42aaa'] }],
    },
  },
  '11155420': {
    [addresses['11155420'].relays.Keep3rRelay]: {
      callers: [],
      jobsData: [{ job: addresses['11155420'].keep3rV2, functionSelectors: ['0xb70362b9', '0x6ba42aaa'] }],
    },
    [addresses['11155420'].relays.Keep3rBondedRelay]: {
      callers: [],
      jobsData: [{ job: addresses['11155420'].keep3rV2, functionSelectors: ['0xb70362b9', '0x6ba42aaa'] }],
    },
  },
};
