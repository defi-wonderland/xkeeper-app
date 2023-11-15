import 'viem/window';
import { Chain as WagmiChain, createPublicClient, custom, fallback, http } from 'viem';
import { PublicClient } from 'wagmi';
import { goerli, mainnet, optimism, arbitrum, polygon } from 'wagmi/chains';

import { getConfig } from '~/config';

export const getAlchemyProvider = (chainId: number) => {
  const { availableChains, ALCHEMY_KEY } = getConfig();
  const apiUrl = availableChains[chainId].alchemyUrl;
  return `${apiUrl}/${ALCHEMY_KEY}`;
};

export const getCustomClient = (chainId: number, address?: string) => {
  const alchemy = http(getAlchemyProvider(chainId), { batch: true });
  const customTransport = custom(window.ethereum!);

  // this allows to use the connected wallet rpc provider
  const transportFallback = fallback(address ? [customTransport, alchemy] : [alchemy]);

  const selectedChain: WagmiChain =
    [goerli, mainnet, optimism, arbitrum, polygon].find((chain) => chain?.id === chainId) || goerli;

  const publicClient: PublicClient = createPublicClient({
    batch: { multicall: true },
    chain: selectedChain,
    transport: transportFallback,
  });

  return publicClient;
};
