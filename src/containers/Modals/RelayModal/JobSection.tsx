import { Box, Radio, styled } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { isAddress, isHex } from 'viem';

import { StyledInput, StyledText, FunctionDropdown, STextarea } from '~/components';
import { useAbi, useModal, useSelectorName, useTheme } from '~/hooks';
import { JobsData, ModalType } from '~/types';

interface JobSectionProps {
  jobIndex: number;
  isLoading: boolean;
  jobsData: JobsData;
  setJobsData: (value: JobsData) => void;
}

export const JobSection = ({ isLoading, jobIndex, jobsData, setJobsData }: JobSectionProps) => {
  const [jobAddress, setJobAddress] = useState(jobsData[jobIndex]?.job || '');
  const { modalOpen } = useModal();
  const { getAbi } = useAbi();
  const { selectors: selectorsName, setSelectorName } = useSelectorName();
  const [abi, setAbi] = useState('');
  const [functionSelector, setFunctionSelector] = useState('');
  const [selectors, setSelectors] = useState<string[]>(jobsData[jobIndex]?.functionSelectors || []);

  const CONTRACT_METHOD = 'a';
  const RAW_SELECTOR = 'b';
  const [selectedValue, setSelectedValue] = useState(CONTRACT_METHOD);

  const addContractMethod = (selector: string) => {
    if (!selectors.includes(selector)) {
      setSelectors([...selectors, selector]);
    }
  };

  const addContractMethodName = (name: string) => {
    setSelectorName(functionSelector, name);
  };

  const selectorRepeated = useMemo(() => {
    return selectors.includes(functionSelector);
  }, [selectors, functionSelector]);

  const errorText = useMemo(
    () => (selectorRepeated ? 'Selector already added' : 'Invalid selector'),
    [selectorRepeated],
  );

  const handleChange = (value: string) => {
    setFunctionSelector('');
    setSelectedValue(value);
  };

  const addNewSelector = () => {
    if (!selectors.includes(functionSelector)) {
      setSelectorName(functionSelector, '');
      setSelectors([...selectors, functionSelector]);
      setFunctionSelector('');
    }
  };

  useEffect(() => {
    if (isAddress(jobAddress)) {
      const newJobsData = [...jobsData];
      newJobsData[jobIndex] = { job: jobAddress, functionSelectors: selectors };
      setJobsData(newJobsData);
    }
  }, [jobAddress, jobIndex, selectors]);

  useEffect(() => {
    isAddress(jobsData[jobIndex]?.job) && setJobAddress(jobsData[jobIndex]?.job);
    isHex(jobsData[jobIndex]?.functionSelectors[0]) && setSelectors(jobsData[jobIndex]?.functionSelectors);
  }, [jobIndex, jobsData]);

  useEffect(() => {
    if (!abi) {
      getAbi(jobAddress).then((result) => setAbi(result));
    }
  }, [getAbi, jobAddress]);

  // Reset form when modal is closed
  useEffect(() => {
    if (modalOpen === ModalType.NONE) {
      setJobAddress('');
      setFunctionSelector('');
      setSelectedValue(CONTRACT_METHOD);
    }
  }, [modalOpen]);

  return (
    <>
      {/* Job Address */}
      <StyledInput
        dataTestId='job-address-input'
        label='Job address'
        placeholder='Enter Job address...'
        value={jobAddress}
        setValue={setJobAddress}
        disabled={isLoading}
        error={!!jobAddress && !isAddress(jobAddress)}
        errorText='Invalid address'
      />

      {/* Function selector */}
      {!!selectors.length && (
        <>
          <InputLabel sx={{ mb: '1.6rem' }}>Selectors</InputLabel>
          {selectors.map((selector, index) => (
            <StyledInput
              key={selector + index}
              value={selectorsName[selector] ? `${selectorsName[selector]} (${selector})` : selector}
              setValue={() => null}
              dataTestId='function-selector-input'
              onClick={() => {
                console.log(selectors, index);
                setSelectors([...selectors].splice(index, 1));
              }}
              removable
              sx={{ mt: '-1rem' }}
            />
          ))}
        </>
      )}

      {/* ABI input */}
      {/* Temporary commented: until design is approved */}
      <DropdownLabel>New function selector</DropdownLabel>
      <AbiTextarea
        value={abi}
        placeholder='Enter contract ABI...'
        spellCheck={false}
        disabled={isLoading || selectedValue === RAW_SELECTOR}
        onChange={(e) => setAbi(e.target.value)}
      />

      {/* Function dropdown */}
      {selectedValue === CONTRACT_METHOD && (
        <DropdownContainer>
          <FunctionDropdown
            value={''}
            setValue={addContractMethodName}
            setSignature={addContractMethod}
            abi={abi}
            disabled={!abi || isLoading}
          />
        </DropdownContainer>
      )}

      {/* Function selector */}
      {selectedValue === RAW_SELECTOR && (
        <StyledInput
          // label='New function selector'
          value={functionSelector}
          setValue={setFunctionSelector}
          onClick={addNewSelector}
          disabled={isLoading}
          dataTestId='function-selector-input'
          error={selectorRepeated}
          errorText={errorText}
          addable={!!functionSelector && !isLoading && isHex(functionSelector) && functionSelector.length === 10}
          sx={{ marginTop: '1rem' }}
        />
      )}

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
    </>
  );
};

const AbiTextarea = styled(STextarea)({
  marginTop: '1rem',
});

const RadioContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.4rem',
  alignItems: 'center',
  margin: '-1rem 0 2rem 0',
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
  marginTop: '1rem',
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

const InputLabel = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    cursor: 'default',
    // marginBottom: '1.6rem',
    marginRight: 'auto',
  };
});
