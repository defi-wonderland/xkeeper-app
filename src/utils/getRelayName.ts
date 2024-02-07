import { getConstants } from '~/config/constants';

export const getRelayName = (relayAddress: string, customName?: string) => {
  const {
    relays: { GelatoRelay, OpenRelay, Keep3rRelay, Keep3rBondedRelay },
  } = getConstants().addresses;

  switch (relayAddress.toLowerCase()) {
    case GelatoRelay.toLowerCase():
      return 'Gelato Relay';

    case OpenRelay.toLowerCase():
      return 'Open Relay';

    case Keep3rRelay.toLowerCase():
      return 'Keep3r Relay';

    case Keep3rBondedRelay.toLowerCase():
      return 'Keep3r Bonded Relay';

    default:
      return customName ? customName : 'Custom Relay';
  }
};
