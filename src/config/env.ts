import { Env } from '~/types';

export const getEnv = (): Env => {
  const { VITE_RPC_URL, VITE_PROJECT_ID, VITE_ALCHEMY_KEY, VITE_TEST, VITE_TEST_PRIVATE_KEY, VITE_ETHERSCAN_KEY } =
    import.meta.env;

  return {
    RPC_URL: VITE_RPC_URL,
    PROJECT_ID: VITE_PROJECT_ID,
    ALCHEMY_KEY: VITE_ALCHEMY_KEY,
    ETHERSCAN_KEY: VITE_ETHERSCAN_KEY,

    TEST_MODE: VITE_TEST === 'true',
    TEST_PRIVATE_KEY: VITE_TEST_PRIVATE_KEY,
  };
};
