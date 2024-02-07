import { useMemo } from 'react';
import { PublicClient, useAccount } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { Chain as WagmiChain, createPublicClient, custom, fallback, http } from 'viem';
import 'viem/window';

import { getConfig } from '~/config';
import { Chains } from '~/types';
import { supportedChains } from '~/utils';

const { TEST_MODE, DEFAULT_CHAIN, availableChains, ALCHEMY_KEY } = getConfig();

const getAlchemyProvider = (chainId: number, availableChains: Chains) => {
  const activeChain = chainId || DEFAULT_CHAIN;
  const apiUrl = availableChains[activeChain]?.alchemyUrl;
  return `${apiUrl}/${ALCHEMY_KEY}`;
};

export const useCustomClient = (chainId: number) => {
  const { address: userAddress } = useAccount();

  const customClient = useMemo(() => {
    const alchemy = http(getAlchemyProvider(chainId || DEFAULT_CHAIN, availableChains), { batch: true });
    const customTransport = custom(window.ethereum!);

    // this allows to use the connected wallet rpc provider
    const transportFallback = fallback(userAddress ? [customTransport, alchemy] : [alchemy]);

    const selectedChain: WagmiChain = supportedChains.find((chain) => chain?.id === chainId) || sepolia;
    const publicClient: PublicClient = createPublicClient({
      batch: { multicall: true },
      chain: selectedChain,
      transport: TEST_MODE ? http('http://127.0.0.1:8545') : transportFallback,
    });

    return publicClient;
  }, [chainId, userAddress]);

  return { publicClient: customClient };
};
