import { useMemo, useState } from 'react';
import { Box, styled } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { isAddress } from 'viem';

import { useTheme } from '~/hooks';
import { Icon, StyledTitle } from '~/components';
import { CallerSection } from './CallerSection';
import { JobsData } from '~/types';
import { JobSection } from './JobSection';
import { truncateAddress } from '~/utils';

interface StyledAccordionProps {
  callersList: string[];
  setCallersList: (value: string[]) => void;
  isLoading: boolean;
}

export const StyledAccordion = ({ callersList, setCallersList, isLoading }: StyledAccordionProps) => {
  const { currentTheme } = useTheme();
  const [addCallerOpen, setAddCallerOpen] = useState<boolean>(true);
  const [jobsData, setJobsData] = useState<JobsData>([]);
  const [jobsCount, setJobsCount] = useState<number>(0);

  const handleAddCaller = () => {
    setAddCallerOpen(!addCallerOpen);
  };

  const handleAddJob = () => {
    setJobsCount(jobsCount + 1);
    const newJobsData = [...jobsData];
    newJobsData.push({ job: '', functionSelectors: [] });
    setJobsData(newJobsData);
  };

  const handleRemoveJob = (index: number) => {
    const newJobsData = [...jobsData];
    newJobsData.splice(index, 1);
    setJobsData(newJobsData);
  };

  const allowAddNewJob = useMemo(() => {
    // if there are no jobs, allow adding a new one
    if (!jobsData.length) return true;

    // if there are jobs, check if the last job has an address
    return jobsData[jobsData.length - 1].job !== '';
  }, [jobsData]);

  return (
    <AccordionContainer>
      <AccordionBox disableGutters>
        <SAccordionSummary
          onClick={handleAddCaller}
          expandIcon={
            <Icon
              name={!callersList.length && addCallerOpen ? 'plus' : 'chevron-down'}
              color={currentTheme.textDisabled}
              size='2rem'
            />
          }
        >
          <StyledTitle>{callersList.length ? `Callers (${callersList.length})` : 'Add Callers'}</StyledTitle>
        </SAccordionSummary>

        <SAccordionDetails>
          {/* Callers section */}
          <CallerSection callersList={callersList} setCallersList={setCallersList} isLoading={isLoading} />
        </SAccordionDetails>
      </AccordionBox>

      {jobsData.map((job, index) => (
        <AccordionBox disableGutters key={job.job}>
          <SAccordionSummary
            expandIcon={
              <>
                {!job.job && <Icon name='chevron-down' color={currentTheme.textDisabled} size='2rem' />}

                {!!job.job && (
                  <SIcon
                    name='close'
                    color={currentTheme.textDisabled}
                    size='2rem'
                    onClick={() => handleRemoveJob(index)}
                  />
                )}
              </>
            }
          >
            <StyledTitle>
              Job {index + 1} {isAddress(job.job) ? `(${truncateAddress(job.job)})` : ''}
            </StyledTitle>
          </SAccordionSummary>

          <SAccordionDetails>
            {/* Job section */}
            <JobSection jobsData={jobsData} setJobsData={setJobsData} jobIndex={index} isLoading={isLoading} />
          </SAccordionDetails>
        </AccordionBox>
      ))}

      <AccordionBox disableGutters expanded={false}>
        <SAccordionSummary
          disabled={!allowAddNewJob}
          onClick={handleAddJob}
          expandIcon={<Icon name='plus' color={currentTheme.textDisabled} size='2rem' />}
        >
          <StyledTitle>Add Job</StyledTitle>
        </SAccordionSummary>
      </AccordionBox>
    </AccordionContainer>
  );
};

const AccordionContainer = styled(Box)(() => {
  const { currentTheme } = useTheme();

  return {
    marginTop: '-1.2rem',
    padding: '0 0 2.4rem',
    '& .MuiPaper-root.Mui-disabled': {
      backgroundColor: currentTheme.actionButtonDisabled,
      color: currentTheme.actionButtonColorDisabled,
      cursor: 'default',
    },
  };
});

const SAccordionSummary = styled(AccordionSummary)(() => {
  return {
    padding: '1.2rem 0',
  };
});

const AccordionBox = styled(Accordion)(() => {
  const { currentTheme } = useTheme();
  return {
    backgroundColor: currentTheme.backgroundPrimary,
    backgroundImage: 'none',
    boxShadow: 'none',
  };
});

const SAccordionDetails = styled(AccordionDetails)(() => {
  return {
    padding: '0',
  };
});

const SIcon = styled(Icon)(() => {
  const { currentTheme } = useTheme();

  return {
    cursor: 'pointer',
    '&:hover::before': {
      color: currentTheme.textPrimary,
    },
  };
});
