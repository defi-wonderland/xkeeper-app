import { useState, useEffect } from 'react';
import { Box, styled, Radio, Typography } from '@mui/material';
import { isAddress } from 'viem';

import {
  ActiveButton,
  BaseModal,
  CancelButton,
  CloseButton,
  InputLabel,
  STextarea,
  StyledInput,
  StyledTitle,
  FunctionDropdown,
  Icon,
  ConfirmText,
} from '~/components';
import { TitleContainer } from '~/containers';
import { ModalType } from '~/types';
import { useStateContext, useVault } from '~/hooks';
import { getContractAbi, getReceiptMessage } from '~/utils';

export const JobModal = () => {
  const { modalOpen, setModalOpen, selectedVault, loading, currentTheme, currentNetwork } = useStateContext();
  const handleClose = () => setModalOpen(ModalType.NONE);

  const [jobAddress, setJobAddress] = useState('');
  const [jobAbi, setJobAbi] = useState('');
  const [contractFunction, setContractFunction] = useState('');
  const [functionSignature, setFunctionSignature] = useState('');

  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (value: string) => {
    setFunctionSignature('');
    setSelectedValue(value);
  };

  const { handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'approveJobFunctions',
    args: [jobAddress, [functionSignature]],
    notificationTitle: 'Job successfully approved',
    notificationMessage: getReceiptMessage(jobAddress, 'job is now enabled'),
  });

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
          <STitle>Add New Job</STitle>

          <CloseButton variant='text' onClick={handleClose}>
            <Icon name='close' size='2.4rem' color={currentTheme.textTertiary} />
          </CloseButton>
        </TitleContainer>

        {/* Job Address */}
        <StyledInput
          label='Job address'
          placeholder='Enter Job address...'
          value={jobAddress}
          setValue={setJobAddress}
          disabled={loading}
          error={!!jobAddress && !isAddress(jobAddress)}
          errorText='Invalid address'
        />

        {/* ABI input */}
        <AbiTextarea
          value={jobAbi}
          placeholder='Enter contract ABI...'
          spellCheck={false}
          disabled={loading || selectedValue === 'b'}
          onChange={(e) => setJobAbi(e.target.value)}
        />

        {/* Radio Buttons section */}
        <RadioContainer>
          <BtnContainer onClick={() => handleChange('a')}>
            <Radio
              checked={selectedValue === 'a'}
              value='a'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'A' }}
              disabled={loading}
            />
            <InputLabel>Choose function</InputLabel>
          </BtnContainer>

          <BtnContainer onClick={() => handleChange('b')}>
            <Radio
              checked={selectedValue === 'b'}
              value='b'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'B' }}
              disabled={loading}
            />
            <InputLabel>Enter raw function signature</InputLabel>
          </BtnContainer>
        </RadioContainer>

        {/* Function dropdown */}
        {selectedValue === 'a' && (
          <DropdownContainer>
            <DropdownLabel>Contract function</DropdownLabel>
            <FunctionDropdown
              value={contractFunction}
              setValue={setContractFunction}
              setSignature={setFunctionSignature}
              abi={jobAbi}
              disabled={!jobAbi || loading}
            />
          </DropdownContainer>
        )}

        {/* Function signature */}
        {selectedValue === 'b' && (
          <StyledInput
            label='Function signature'
            value={functionSignature}
            setValue={setFunctionSignature}
            disabled={loading}
          />
        )}

        <SButtonsContainer>
          <CancelButton variant='outlined' disabled={loading} onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' disabled={!writeAsync || loading} onClick={handleSendTransaction}>
            <ConfirmText isLoading={loading} />
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

const AbiTextarea = styled(STextarea)({
  marginTop: '-0.8rem',
});

const RadioContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.4rem',
  alignItems: 'center',
  margin: '1.6rem 0 2rem 0',
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0rem',
  },
});

export const DropdownContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
  width: '100%',
});

export const DropdownLabel = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
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

const BtnContainer = styled(Box)({
  p: {
    cursor: 'pointer',
  },
});
