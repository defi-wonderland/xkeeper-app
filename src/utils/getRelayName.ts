import { getConstants } from '~/config/constants';

export const getRelayName = (relayAddress: string) => {
  const { GelatoRelay, OpenRelay, Keep3rRelay } = getConstants().addresses;

  switch (relayAddress.toLowerCase()) {
    case GelatoRelay.toLowerCase():
      return 'Gelato Relay';

    case OpenRelay.toLowerCase():
      return 'Open Relay';

    case Keep3rRelay.toLowerCase():
      return 'Keep3r Relay';

    default:
      return 'Custom Relay';
  }
};
