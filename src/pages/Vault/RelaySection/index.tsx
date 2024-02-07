import { Address } from 'viem';

import { JobsData } from '~/types';
import { RelayHeader } from './RelayHeader';
import { JobsTable } from './JobsTable';
import { SCard } from '../Tokens';

interface RelaySectionProps {
  relayAddress: string;
  relayData: {
    callers: Address[];
    jobsData: JobsData;
  };
}

export const RelaySection = ({ relayAddress, relayData: { callers, jobsData } }: RelaySectionProps) => {
  return (
    <SCard variant='outlined'>
      {/* Relay Section Header */}
      <RelayHeader relayAddress={relayAddress} callers={callers} />

      {/* Jobs Table */}
      <JobsTable jobsData={jobsData} />
    </SCard>
  );
};
