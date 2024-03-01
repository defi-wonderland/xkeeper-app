import { getConstants } from '~/config/constants';

export const getRelayName = (relayAddress: string, chainId: number | string, customName?: string) => {
  const { addresses } = getConstants();

  switch (relayAddress.toLowerCase()) {
    case addresses[chainId].relays.GelatoRelay.toLowerCase():
      return 'Gelato Relay';

    case addresses[chainId].relays.OpenRelay.toLowerCase():
      return 'Open Relay';

    case addresses[chainId].relays.Keep3rRelay.toLowerCase():
      return 'Keep3r Relay';

    case addresses[chainId].relays.Keep3rBondedRelay.toLowerCase():
      return 'Keep3r Bonded Relay';

    default:
      return customName ? customName : 'Custom Relay';
  }
};
