import { Config } from '~/types';

import { getEnv } from './env';
import { getConstants } from './constants';

export * from './wagmi';

export const getConfig = (): Config => ({
  ...getEnv(),
  ...getConstants(),
});
