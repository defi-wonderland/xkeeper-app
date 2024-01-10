import { SectionHeader, SCard } from './Tokens';
import { ActiveButton, StyledTitle } from '~/components';
import { ModalType } from '~/types';
import { useModal, useStateContext } from '~/hooks';

export const EnabledRelays = () => {
  const { userAddress, selectedVault } = useStateContext();
  const { setModalOpen } = useModal();

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <StyledTitle></StyledTitle>

        {selectedVault?.owner === userAddress && (
          <ActiveButton
            data-test='add-relay-button'
            variant='contained'
            onClick={() => setModalOpen(ModalType.ADD_RELAY)}
          >
            Add New Relay
          </ActiveButton>
        )}
      </SectionHeader>
    </SCard>
  );
};
