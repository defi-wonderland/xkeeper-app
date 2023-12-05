import { useMemo } from 'react';
import { useNetwork } from 'wagmi';

import { getConfig } from '~/config';
import { getCustomClient } from '~/utils';
import { useStateContext } from '~/hooks';

export const useCustomClient = () => {
  const { userAddress } = useStateContext();
  const { TEST_MODE, DEFAULT_CHAIN } = getConfig();
  const { chain } = useNetwork();

  const customClient = useMemo(() => {
    return getCustomClient(TEST_MODE ? DEFAULT_CHAIN : chain?.id || DEFAULT_CHAIN, userAddress, TEST_MODE);
  }, [chain?.id, DEFAULT_CHAIN, userAddress, TEST_MODE]);

  return { publicClient: customClient };
};
