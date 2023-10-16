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
} from '~/components';
import { ButtonsContainer, TitleContainer } from '~/containers';
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
  const [jobAlias, setJobAlias] = useState('');

  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFunctionSignature('');
    setSelectedValue(event.target.value);
  };

  const { handleSendTransaction, writeAsync } = useVault({
    contractAddress: selectedVault?.address,
    functionName: 'approveRelayCallers',
    args: [jobAddress, [functionSignature]],
    notificationTitle: 'Job successfully approved',
    notificationMessage: getReceiptMessage(jobAddress, 'job is now enabled'),
  });

  useEffect(() => {
    if (isAddress(jobAddress)) {
      getContractAbi(currentNetwork.name, jobAddress).then((abi) => {
        setJobAbi(abi);
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
          value={jobAddress}
          setValue={setJobAddress}
          disabled={loading}
          error={!!jobAddress && !isAddress(jobAddress)}
          errorText='Invalid address'
        />

        {/* ABI input */}
        <AbiTextarea
          value={jobAbi}
          spellCheck={false}
          disabled={loading || selectedValue === 'b'}
          onChange={(e) => setJobAbi(e.target.value)}
        />

        {/* Radio Buttons section */}
        <RadioContainer>
          <div>
            <Radio
              checked={selectedValue === 'a'}
              onChange={handleChange}
              value='a'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'A' }}
              disabled={loading}
            />
            <InputLabel>Choose function</InputLabel>
          </div>
          <div>
            <Radio
              checked={selectedValue === 'b'}
              onChange={handleChange}
              value='b'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'B' }}
              disabled={loading}
            />
            <InputLabel>Enter raw function signature</InputLabel>
          </div>
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

        {/* Alias input */}
        <StyledInput
          label='Job alias'
          value={jobAlias}
          setValue={setJobAlias}
          description='This will only be visible to you.'
          disabled={loading}
        />

        <ButtonsContainer>
          <CancelButton variant='outlined' disabled={loading} onClick={handleClose}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained' disabled={!writeAsync || loading} onClick={handleSendTransaction}>
            {!loading && 'Confirm'}
            {loading && 'Loading...'}
          </ActiveButton>
        </ButtonsContainer>
      </BigModal>
    </BaseModal>
  );
};

export const BigModal = styled(Box)({
  width: '59.6rem',
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
});

const DropdownContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
});

const DropdownLabel = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
  };
});
