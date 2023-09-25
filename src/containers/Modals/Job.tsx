import { useState } from 'react';
import { Box, styled, Radio } from '@mui/material';
import { ActiveButton, BaseModal, CancelButton, InputLabel, STextarea, StyledInput, StyledTitle } from '~/components';
import { ButtonsContainer } from '~/containers/Modals';

interface JobModalProps {
  children: React.ReactNode;
}

export const JobModal = ({ children }: JobModalProps) => {
  const [jobAddress, setJobAddress] = useState('');
  const [jobAbi, setJobAbi] = useState('');

  const [contractFunction, setContractFunction] = useState('');
  const [functionSignature, setFunctionSignature] = useState('');
  const [jobAlias, setJobAlias] = useState('');

  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <BaseModal triggerButton={children}>
      <BigModal>
        <STitle>Add New Job</STitle>

        <StyledInput label='Job address' value={jobAddress} setValue={setJobAddress} />

        <AbiTextarea value={jobAbi} spellCheck={false} onChange={(e) => setJobAbi(e.target.value)} />

        <RadioContainer>
          <div>
            <Radio
              checked={selectedValue === 'a'}
              onChange={handleChange}
              value='a'
              name='radio-buttons'
              inputProps={{ 'aria-label': 'A' }}
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
            />
            <InputLabel>Enter raw function signature</InputLabel>
          </div>
        </RadioContainer>

        {selectedValue === 'a' && (
          <StyledInput label='Contract function' value={contractFunction} setValue={setContractFunction} />
        )}

        {selectedValue === 'b' && (
          <StyledInput label='Function signature' value={functionSignature} setValue={setFunctionSignature} />
        )}

        <StyledInput
          label='Job alias'
          value={jobAlias}
          setValue={setJobAlias}
          description='This will only be visible to you.'
        />

        <ButtonsContainer>
          <CancelButton variant='outlined' onClick={close}>
            Cancel
          </CancelButton>

          <ActiveButton variant='contained'>Confirm</ActiveButton>
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
