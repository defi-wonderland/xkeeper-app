import { useState } from 'react';
import { Box, styled, Radio, Typography } from '@mui/material';
import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';
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
} from '~/components';
import { ButtonsContainer, SCloseIcon, TitleContainer } from '~/containers';
import { ModalType } from '~/types';
import { useStateContext } from '~/hooks';
import { vaultABI } from '~/generated';

export const JobModal = () => {
  const { modalOpen, setModalOpen, selectedVault, setNotificationOpen, loading, setLoading } = useStateContext();
  const handleClose = () => setModalOpen(ModalType.NONE);
  const publicClient = usePublicClient();

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

  const { config } = usePrepareContractWrite({
    address: selectedVault?.address,
    abi: vaultABI,
    functionName: 'approveJobFunctions',
    args: [jobAddress as Address, [functionSignature as `0x${string}`]],
  });

  const { writeAsync } = useContractWrite(config);

  const handleApproveJob = async () => {
    setLoading(true);
    try {
      // temporary log
      console.log('approving job...');
      if (writeAsync) {
        const writeResult = await writeAsync();
        await publicClient.waitForTransactionReceipt(writeResult);
        setModalOpen(ModalType.NONE);
        setNotificationOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <BaseModal open={modalOpen === ModalType.ADD_JOB}>
      <BigModal>
        <TitleContainer>
          <STitle>Add New Job</STitle>

          <CloseButton variant='text' onClick={handleClose}>
            <SCloseIcon />
          </CloseButton>
        </TitleContainer>

        <StyledInput
          label='Job address'
          value={jobAddress}
          setValue={setJobAddress}
          disabled={loading}
          error={!!jobAddress && !isAddress(jobAddress)}
          errorText='Invalid address'
        />

        <AbiTextarea value={jobAbi} spellCheck={false} disabled={loading} onChange={(e) => setJobAbi(e.target.value)} />

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

        {selectedValue === 'a' && (
          <DropdownContainer>
            <DropdownLabel>Contract function</DropdownLabel>
            <FunctionDropdown
              value={contractFunction}
              setValue={setContractFunction}
              setSignature={setFunctionSignature}
              abi={jobAbi}
              disabled={!contractFunction || loading}
            />
          </DropdownContainer>
        )}

        {selectedValue === 'b' && (
          <StyledInput
            label='Function signature'
            value={functionSignature}
            setValue={setFunctionSignature}
            disabled={loading}
          />
        )}

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

          <ActiveButton variant='contained' disabled={!writeAsync || loading} onClick={handleApproveJob}>
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
