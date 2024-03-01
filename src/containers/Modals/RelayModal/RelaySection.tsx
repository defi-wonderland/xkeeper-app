import { useEffect, useMemo, useState } from 'react';
import { Typography, styled } from '@mui/material';
import { isAddress } from 'viem';

import { DropdownContainer } from '~/containers';
import { RelayDropdown, StyledInput } from '~/components';
import { useModal, useStateContext, useTheme } from '~/hooks';
import { getRelayName } from '~/utils';
import { getConfig } from '~/config';
import { ModalType } from '~/types';

interface RelaySectionProps {
  isLoading: boolean;
  relayAddress: string;
  setRelayAddress: (value: string) => void;
}

export const RelaySection = ({ relayAddress, setRelayAddress, isLoading }: RelaySectionProps) => {
  const { addresses } = getConfig();
  const { modalOpen } = useModal();
  const [customRelay, setCustomRelay] = useState(false);
  const { selectedItem, currentNetwork } = useStateContext();
  const { selectedAddress: selectedRelayAddress } = selectedItem || {};

  const availableValues = useMemo(
    () => [...Object.values(addresses[currentNetwork?.id].relays), 'Choose relay'],
    [addresses, currentNetwork?.id],
  );

  const dropdownValue = useMemo(
    () => getRelayName(relayAddress, currentNetwork?.id, selectedRelayAddress ? 'Custom relay' : 'Choose relay'),
    [currentNetwork?.id, relayAddress, selectedRelayAddress],
  );

  const handleCustomRelayAddress = () => {
    setRelayAddress('');
    setCustomRelay(!customRelay);
  };

  useEffect(() => {
    setRelayAddress(selectedRelayAddress || '');
  }, [selectedItem, selectedRelayAddress, setRelayAddress]);

  // Reset values when modal is closed
  useEffect(() => {
    if (modalOpen === ModalType.NONE) {
      setRelayAddress('');
    }
  }, [availableValues, modalOpen, setRelayAddress]);

  return (
    <>
      <DropdownContainer>
        <DropdownLabel>Relay</DropdownLabel>
        <RelayDropdown
          value={dropdownValue}
          setValue={setRelayAddress}
          availableValues={availableValues}
          disabled={isLoading || !!selectedRelayAddress}
          setCustomRelay={setCustomRelay}
          customRelay={customRelay}
        />
      </DropdownContainer>

      {customRelay && (
        <StyledInput
          value={relayAddress}
          setValue={setRelayAddress}
          placeholder='Enter relay address'
          disabled={isLoading}
          error={!!relayAddress && !isAddress(relayAddress)}
          errorText='Invalid address'
          isAutoFocus
          removable
          onClick={handleCustomRelayAddress}
          sx={{ mt: '-1rem' }}
        />
      )}

      {isAddress(relayAddress) && !customRelay && <StyledInput sx={{ mt: '-1rem' }} value={relayAddress} copyable />}
    </>
  );
};

export const DropdownLabel = styled(Typography)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
  };
});
