import { Config } from '~/types';

import { getEnv } from './env';
import { getConstants } from './constants';

import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

// this provider is for loading data when the user is not connected
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(getEnv().RPC_URL, { batch: true }),
});

export const getConfig = (): Config => ({
  ...getEnv(),
  ...getConstants(),
});
