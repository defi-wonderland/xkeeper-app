import { Box, styled } from '@mui/material';

import { ActiveButton, STooltip, StyledTitle, SubTitle } from '~/components';
import { getRelayName, truncateAddress } from '~/utils';
import { ModalType } from '~/types';
import { ButtonsContainer, SectionHeader } from '../Tokens';
import { useAlias, useModal, useStateContext } from '~/hooks';
import { Address } from 'abitype';

interface RelayHeaderProps {
  relayAddress: string;
}

export const RelayHeader = ({ relayAddress }: RelayHeaderProps) => {
  const { setModalOpen } = useModal();
  const { aliasData } = useAlias();
  const { userAddress, selectedVault, setSelectedItem } = useStateContext();

  const handleAddJob = () => {
    setSelectedItem({
      type: 'job',
      relayAddress: relayAddress as Address,
    });
    setModalOpen(ModalType.ADD_JOB);
  };
  const handleAddCaller = () => {
    setSelectedItem({
      type: 'caller',
      relayAddress: relayAddress as Address,
    });
    setModalOpen(ModalType.ADD_RELAY);
  };

  // temporary commented: until design is ready
  //   const handleRevokeRelay = () => {
  //     setSelectedItem({
  //       type: 'vault',
  //       params: [],
  //       relayAddress: relayAddress as Address,
  //     });
  //     setModalOpen(ModalType.REVOQUE);
  //   };

  return (
    <SectionHeader>
      <Box>
        <StyledTitle>{aliasData[relayAddress] || getRelayName(relayAddress)}</StyledTitle>

        <SSubTitle>
          Address:
          <STooltip text={relayAddress} address>
            {' '}
            {truncateAddress(relayAddress)}
          </STooltip>
        </SSubTitle>
      </Box>

      {selectedVault?.owner === userAddress && (
        <ButtonsContainer>
          <ActiveButton data-test='add-job-button' variant='contained' onClick={handleAddJob}>
            Add Job
          </ActiveButton>

          <ActiveButton data-test='add-caller-button' variant='contained' onClick={handleAddCaller}>
            Add Caller
          </ActiveButton>

          {/* temporary commented */}
          {/* <RevokeButton data-test='revoke-relay-button' variant='contained' onClick={handleRevokeRelay}>
            Revoke Relay
          </RevokeButton> */}
        </ButtonsContainer>
      )}
    </SectionHeader>
  );
};

const SSubTitle = styled(SubTitle)({
  span: { cursor: 'pointer' },
});
