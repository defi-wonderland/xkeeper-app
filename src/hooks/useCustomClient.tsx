import { useMemo } from 'react';
import { PublicClient, useNetwork } from 'wagmi';
import { goerli, mainnet, optimism, arbitrum, polygon } from 'wagmi/chains';
import { Chain as WagmiChain, createPublicClient, custom, fallback, http } from 'viem';
import 'viem/window';

import { getConfig } from '~/config';
import { useStateContext } from '~/hooks';

export const useCustomClient = () => {
  const { userAddress } = useStateContext();
  const { TEST_MODE, DEFAULT_CHAIN, availableChains, ALCHEMY_KEY } = getConfig();
  const { chain } = useNetwork();

  const customClient = useMemo(() => {
    const getAlchemyProvider = (chainId: number) => {
      const apiUrl = availableChains[chainId]?.alchemyUrl || availableChains[DEFAULT_CHAIN]?.alchemyUrl;
      return `${apiUrl}/${ALCHEMY_KEY}`;
    };

    const chainId = TEST_MODE ? DEFAULT_CHAIN : chain?.id || DEFAULT_CHAIN;

    const alchemy = http(getAlchemyProvider(chainId), { batch: true });
    const customTransport = custom(window.ethereum!);

    // this allows to use the connected wallet rpc provider
    const transportFallback = fallback(userAddress ? [customTransport, alchemy] : [alchemy]);

    const selectedChain: WagmiChain =
      [goerli, mainnet, optimism, arbitrum, polygon].find((chain) => chain?.id === chainId) || goerli;

    const publicClient: PublicClient = createPublicClient({
      batch: { multicall: true },
      chain: selectedChain,
      transport: TEST_MODE ? http('http://127.0.0.1:8545') : transportFallback,
    });

    return publicClient;
  }, [TEST_MODE, DEFAULT_CHAIN, chain?.id, userAddress, availableChains, ALCHEMY_KEY]);

  return { publicClient: customClient };
};
