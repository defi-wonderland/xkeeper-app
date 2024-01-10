import { useState } from 'react';
import { Box, styled } from '@mui/material';
import { Address } from 'abitype';

import { ActiveButton, Icon, IconContainer, STooltip, StyledTitle, SubTitle } from '~/components';
import { copyData, getRelayName, truncateAddress } from '~/utils';
import { ModalType } from '~/types';
import { ButtonsContainer, SectionHeader } from '../Tokens';
import { useAlias, useModal, useStateContext, useTheme } from '~/hooks';

interface RelayHeaderProps {
  relayAddress: string;
}

export const RelayHeader = ({ relayAddress }: RelayHeaderProps) => {
  const { currentTheme } = useTheme();
  const { setModalOpen } = useModal();
  const { aliasData } = useAlias();
  const { userAddress, selectedVault, setSelectedItem } = useStateContext();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    copyData(relayAddress);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 800);
  };

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

  return (
    <SectionHeader>
      <Box>
        <StyledTitle>{aliasData[relayAddress] || getRelayName(relayAddress)}</StyledTitle>

        <SSubTitle onClick={handleCopy}>
          Address:
          <STooltip text={relayAddress} address>
            {' '}
            {truncateAddress(relayAddress)}
          </STooltip>
          <STooltip text={copied ? 'Copied!' : 'Copy Address'}>
            <IconContainer>
              {!copied && <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />}
              {!!copied && <Icon name='check' color={currentTheme.textDisabled} size='1.7rem' />}
            </IconContainer>
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
        </ButtonsContainer>
      )}
    </SectionHeader>
  );
};

const SSubTitle = styled(SubTitle)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.6rem',
  span: { cursor: 'pointer' },
});
