import { useState, useEffect, useMemo } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Address, isAddress } from 'viem';

import {
  ActiveButton,
  BaseModal,
  CancelButton,
  CloseButton,
  StyledTitle,
  Icon,
  ConfirmText,
  StyledInput,
} from '~/components';
import { TitleContainer } from '~/containers';
import { ModalType, Status } from '~/types';
import { useModal, useStateContext, useTheme, useVault } from '~/hooks';
import { getContractAbi, getReceiptMessage } from '~/utils';
import { JobSection } from './Relay/JobSection';

export const JobModal = () => {
  const { selectedVault, currentNetwork, selectedItem } = useStateContext();
  const { modalOpen, setModalOpen } = useModal();
  const { currentTheme } = useTheme();
  const handleClose = () => setModalOpen(ModalType.NONE);

  const [jobAddress, setJobAddress] = useState('');
  const [jobAbi, setJobAbi] = useState('');
  const [contractFunction, setContractFunction] = useState('');
  const [functionSignature, setFunctionSignature] = useState('');

  const [selectedValue, setSelectedValue] = useState('a');

  const relayAddress = useMemo(() => selectedItem.relayAddress as Address, [selectedItem]);
  const selectedJobAddress = useMemo(() => selectedItem.jobAddress as Address, [selectedItem]);

  const handleChange = (value: string) => {
    setFunctionSignature('');
    setSelectedValue(value);
  };

  const { requestStatus, handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'approveRelayData',
    args: [relayAddress, [], [{ job: jobAddress, functionSelectors: [functionSignature] }]],
    notificationTitle: 'Job successfully approved',
    notificationMessage: getReceiptMessage(jobAddress, 'job is now enabled'),
  });

  const isLoading = requestStatus === Status.LOADING;

  useEffect(() => {
    setJobAddress(selectedJobAddress);
  }, [selectedItem, selectedJobAddress]);

  useEffect(() => {
    if (isAddress(jobAddress)) {
      getContractAbi(currentNetwork.name, currentNetwork.apiUrl, jobAddress).then((abi) => {
        setJobAbi(abi || '');
      });
    }
  }, [currentNetwork, jobAddress]);

  return (
    <BaseModal open={modalOpen === ModalType.ADD_JOB}>
      <BigModal>
        <TitleContainer>
          <STitle>Edit Job</STitle>

          <CloseButton variant='text' onClick={handleClose}>
            <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
          </CloseButton>
        </TitleContainer>

        <StyledInput label='Relay Address' value={relayAddress} setValue={() => null} disabled />

        <JobSection
          jobAddress={jobAddress}
          setJobAddress={setJobAddress}
          jobAbi={jobAbi}
          setJobAbi={setJobAbi}
          contractFunction={contractFunction}
          setContractFunction={setContractFunction}
          functionSignature={functionSignature}
          setFunctionSignature={setFunctionSignature}
          selectedValue={selectedValue}
          handleChange={handleChange}
          isLoading={isLoading}
        />

        <SButtonsContainer>
          <CancelButton variant='outlined' disabled={isLoading} onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton
            variant='contained'
            disabled={!writeAsync || isLoading}
            onClick={handleSendTransaction}
            data-test='confirm-new-job-button'
          >
            <ConfirmText isLoading={isLoading} />
          </ActiveButton>
        </SButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

export const BigModal = styled(Box)({
  width: '59.6rem',

  '@media (max-width: 600px)': {
    width: '100%',
  },
});

const STitle = styled(StyledTitle)({
  marginBottom: '2.4rem',
});

export const DropdownContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
  width: '100%',
});

export const DropdownLabel = styled(Typography)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
  };
});

const SButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  paddingTop: '1.6rem',
  button: {
    width: '100%',
  },
});
