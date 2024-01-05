import { useEffect, useMemo, useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { isAddress } from 'viem';

import { ActiveButton, BaseModal, CancelButton, StyledTitle, CloseButton, Icon, ConfirmText } from '~/components';
import { BigModal, TitleContainer } from '~/containers';
import { anyCaller, getContractAbi, getReceiptMessage } from '~/utils';
import { useModal, useStateContext, useTheme, useVault } from '~/hooks';
import { ModalType, Status } from '~/types';
import { getConfig } from '~/config';
import { JobSection } from './JobSection';
import { RelaySection } from './RelaySection';

export const RelayModal = () => {
  const { selectedVault, selectedItem, currentNetwork } = useStateContext();
  const { modalOpen, setModalOpen } = useModal();
  const { currentTheme } = useTheme();

  const [relayAddress, setRelayAddress] = useState<string>('');
  const [callerAddress, setCallerAddress] = useState<string>('');
  const [callers, setCallers] = useState<string[]>([]);
  const [allowAnyCaller, setAllowAnyCaller] = useState(false);
  const [customRelay, setCustomRelay] = useState(false);
  const [jobAddress, setJobAddress] = useState('');
  const [jobAbi, setJobAbi] = useState('');
  const [contractFunction, setContractFunction] = useState('');
  const [functionSignature, setFunctionSignature] = useState('');

  const [selectedValue, setSelectedValue] = useState('a');

  const handleClose = () => setModalOpen(ModalType.NONE);
  const {
    addresses: { relays },
  } = getConfig();

  const callerList = useMemo(() => {
    if (allowAnyCaller) {
      return [anyCaller];
    } else {
      return [callerAddress, ...callers];
    }
  }, [allowAnyCaller, callerAddress, callers]);

  const editRelay = useMemo(() => {
    return isAddress(selectedItem.address);
  }, [selectedItem]);

  const availableValues = useMemo(() => [...Object.values(relays), 'Choose Relay'], [relays]);

  const jobsData = useMemo(
    () => (editRelay ? [] : [{ job: jobAddress, functionSelectors: [functionSignature] }]),
    [editRelay, jobAddress, functionSignature],
  );

  const { requestStatus, handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'approveRelayData',
    args: [relayAddress, callerList, jobsData],
    notificationTitle: 'Relay successfuly approved',
    notificationMessage: getReceiptMessage(relayAddress, 'relay is now enabled'),
  });
  const isLoading = requestStatus === Status.LOADING;

  const handleChange = (value: string) => {
    setFunctionSignature('');
    setSelectedValue(value);
  };

  useEffect(() => {
    if (allowAnyCaller) {
      setCallers([anyCaller]);
      setCallerAddress(anyCaller);
    }
  }, [allowAnyCaller]);

  useEffect(() => {
    setCustomRelay(false);
    setRelayAddress(editRelay ? selectedItem.address : '');
  }, [selectedItem, editRelay]);

  useEffect(() => {
    setCallerAddress('');
  }, [modalOpen]);

  useEffect(() => {
    if (isAddress(jobAddress)) {
      getContractAbi(currentNetwork.name, currentNetwork.apiUrl, jobAddress).then((abi) => {
        setJobAbi(abi || '');
      });
    }
  }, [currentNetwork, jobAddress]);

  return (
    <BaseModal open={modalOpen === ModalType.ADD_RELAY}>
      <BigModal>
        <TitleContainer>
          <StyledTitle>Add New Relay</StyledTitle>

          <CloseButton variant='text' onClick={handleClose}>
            <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
          </CloseButton>
        </TitleContainer>

        <RelaySection
          isLoading={isLoading}
          relayAddress={relayAddress}
          setRelayAddress={setRelayAddress}
          callerAddress={callerAddress}
          setCallerAddress={setCallerAddress}
          callers={callers}
          setCallers={setCallers}
          allowAnyCaller={allowAnyCaller}
          setAllowAnyCaller={setAllowAnyCaller}
          customRelay={customRelay}
          setCustomRelay={setCustomRelay}
          editRelay={editRelay}
          availableValues={availableValues}
        />

        {!editRelay && (
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
        )}

        <SButtonsContainer>
          <CancelButton variant='outlined' disabled={isLoading} onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton
            variant='contained'
            disabled={!writeAsync || isLoading}
            onClick={handleSendTransaction}
            data-test='confirm-new-relay-button'
          >
            <ConfirmText isLoading={isLoading} />
          </ActiveButton>
        </SButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

export const TextButton = styled(Button)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.actionButton,
    width: '23rem',
    padding: 0,
    justifyContent: 'flex-start',
    '&:hover': {
      background: 'inherit',
    },
    '&:disabled': {
      color: 'inherit',
      opacity: '0.7',
    },
    svg: {
      color: currentTheme.actionButton,
    },
  };
});

const SButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  paddingTop: '0.4rem',
  button: {
    width: '100%',
  },
});
