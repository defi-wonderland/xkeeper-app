import { Box, Radio, styled } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { isAddress, isHex } from 'viem';

import { StyledInput, StyledText, STextarea, FunctionDropdown, InputLabel } from '~/components';
import { useModal, useStateContext, useTheme } from '~/hooks';
import { JobsData, ModalType } from '~/types';
import { getContractAbi } from '~/utils';

interface JobSectionProps {
  setJobsData: (value: JobsData) => void;
  jobIndex: number;
  jobsData: JobsData;
  isLoading: boolean;
}
export const JobSection = ({ jobsData, setJobsData, isLoading, jobIndex }: JobSectionProps) => {
  const { currentNetwork } = useStateContext();
  const { modalOpen } = useModal();

  const [jobAddress, setJobAddress] = useState('');
  const [jobAbi, setJobAbi] = useState('');
  const [contractFunction, setContractFunction] = useState('');
  const [functionSelector, setFunctionSelector] = useState('');

  const CONTRACT_METHOD = 'a';
  const RAW_SELECTOR = 'b';
  const [selectedValue, setSelectedValue] = useState(CONTRACT_METHOD);

  const handleChange = (value: string) => {
    setFunctionSelector('');
    setSelectedValue(value);
  };

  useEffect(() => {
    if (isAddress(jobAddress) && functionSelector.length > 8) {
      const newJobsData = [...jobsData];
      newJobsData[jobIndex] = { job: jobAddress, functionSelectors: [functionSelector] };
      setJobsData(newJobsData);
    }
    // disabled to avoid infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [functionSelector, jobAddress]);

  useEffect(() => {
    if (isAddress(jobAddress)) {
      getContractAbi(currentNetwork.name, currentNetwork.apiUrl, jobAddress).then((abi) => {
        setJobAbi(abi || '');
      });
    }
  }, [currentNetwork, jobAddress]);

  useEffect(() => {
    isAddress(jobsData[jobIndex].job) && setJobAddress(jobsData[jobIndex].job);
  }, [jobIndex, jobsData]);

  useEffect(() => {
    isHex(jobsData[jobIndex].functionSelectors[0]) && setFunctionSelector(jobsData[jobIndex].functionSelectors[0]);
  }, [jobIndex, jobsData]);

  // Reset form when modal is closed
  useEffect(() => {
    if (modalOpen === ModalType.NONE) {
      setJobAddress('');
      setJobAbi('');
      setContractFunction('');
      setFunctionSelector('');
      setSelectedValue(CONTRACT_METHOD);
    }
  }, [modalOpen]);

  const editJob = useMemo(() => {
    return isAddress(jobsData[jobIndex].job) && isHex(jobsData[jobIndex].functionSelectors[0]);
  }, [jobIndex, jobsData]);

  return (
    <>
      {/* Job Address */}
      <StyledInput
        dataTestId='job-address-input'
        label='Job address'
        placeholder='Enter Job address...'
        value={jobAddress}
        setValue={setJobAddress}
        disabled={isLoading || editJob}
        error={!!jobAddress && !isAddress(jobAddress)}
        errorText='Invalid address'
      />

      {editJob && (
        <>
          {/* Function selector */}
          <StyledInput
            label='Function selector'
            value={jobsData[jobIndex].functionSelectors[0]}
            setValue={() => null}
            disabled
            dataTestId='function-selector-input'
          />
        </>
      )}

      {!editJob && (
        <>
          {/* ABI input */}
          <AbiTextarea
            value={jobAbi}
            placeholder='Enter contract ABI...'
            spellCheck={false}
            disabled={isLoading || selectedValue === RAW_SELECTOR}
            onChange={(e) => setJobAbi(e.target.value)}
          />

          {/* Radio Buttons section */}
          <RadioContainer>
            <BtnContainer onClick={() => !isLoading && handleChange(CONTRACT_METHOD)}>
              {/* Choose function button */}
              <Radio
                data-test='choose-function-button'
                checked={selectedValue === CONTRACT_METHOD}
                value={CONTRACT_METHOD}
                name='radio-buttons'
                inputProps={{ 'aria-label': CONTRACT_METHOD }}
                disabled={isLoading}
              />
              <InputLabel>Choose function</InputLabel>
            </BtnContainer>

            {/* Raw function selector */}
            <BtnContainer onClick={() => !isLoading && handleChange(RAW_SELECTOR)}>
              <Radio
                data-test='raw-function-button'
                checked={selectedValue === RAW_SELECTOR}
                value={RAW_SELECTOR}
                name='radio-buttons'
                inputProps={{ 'aria-label': RAW_SELECTOR }}
                disabled={isLoading}
              />
              <InputLabel>Enter raw function selector</InputLabel>
            </BtnContainer>
          </RadioContainer>

          {/* Function dropdown */}
          {selectedValue === CONTRACT_METHOD && (
            <DropdownContainer>
              <DropdownLabel>Contract selector</DropdownLabel>
              <FunctionDropdown
                value={contractFunction}
                setValue={setContractFunction}
                setSignature={setFunctionSelector}
                abi={jobAbi}
                disabled={!jobAbi || isLoading}
              />
            </DropdownContainer>
          )}

          {/* Function selector */}
          {selectedValue === RAW_SELECTOR && (
            <StyledInput
              label='Function selector'
              value={functionSelector}
              setValue={setFunctionSelector}
              disabled={isLoading}
              dataTestId='function-selector-input'
            />
          )}
        </>
      )}
    </>
  );
};

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

const DropdownContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
  width: '100%',
});

const DropdownLabel = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
  };
});

const BtnContainer = styled(Box)({
  p: {
    cursor: 'pointer',
  },
});
