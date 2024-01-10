import { Box, Radio, styled } from '@mui/material';
import { isAddress } from 'viem';

import { StyledInput, StyledText, STextarea, FunctionDropdown, InputLabel } from '~/components';
import { useTheme } from '~/hooks';

interface JobSectionProps {
  jobAddress: string;
  setJobAddress: (value: string) => void;
  jobAbi: string;
  setJobAbi: (value: string) => void;
  contractFunction: string;
  setContractFunction: (value: string) => void;
  functionSignature: string;
  setFunctionSignature: (value: string) => void;
  selectedValue: string;
  handleChange: (value: string) => void;
  isLoading: boolean;
}
export const JobSection = ({
  jobAddress,
  setJobAddress,
  jobAbi,
  setJobAbi,
  contractFunction,
  setContractFunction,
  functionSignature,
  setFunctionSignature,
  selectedValue,
  handleChange,
  isLoading,
}: JobSectionProps) => {
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

      {/* ABI input */}
      <AbiTextarea
        value={jobAbi}
        placeholder='Enter contract ABI...'
        spellCheck={false}
        disabled={isLoading || selectedValue === 'b'}
        onChange={(e) => setJobAbi(e.target.value)}
      />

      {/* Radio Buttons section */}
      <RadioContainer>
        <BtnContainer onClick={() => !isLoading && handleChange('a')}>
          {/* Choose function button */}
          <Radio
            data-test='choose-function-button'
            checked={selectedValue === 'a'}
            value='a'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'A' }}
            disabled={isLoading}
          />
          <InputLabel>Choose function</InputLabel>
        </BtnContainer>

        {/* Raw function selector */}
        <BtnContainer onClick={() => !isLoading && handleChange('b')}>
          <Radio
            data-test='raw-function-button'
            checked={selectedValue === 'b'}
            value='b'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'B' }}
            disabled={isLoading}
          />
          <InputLabel>Enter raw function selector</InputLabel>
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
            disabled={!jobAbi || isLoading}
          />
        </DropdownContainer>
      )}

      {/* Function signature */}
      {selectedValue === 'b' && (
        <StyledInput
          label='Function selector'
          value={functionSignature}
          setValue={setFunctionSignature}
          disabled={isLoading}
          dataTestId='function-selector-input'
        />
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
