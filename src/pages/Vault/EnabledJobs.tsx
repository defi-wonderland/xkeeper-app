import { TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

import { JobModal } from '~/containers';
import { OptionsMenu, STooltip } from '~/components';
import { ColumnTitle, SCard, SectionHeader, Title, RowText, STableRow, STable } from './Tokens';
import { SButton } from './EnabledRelays';

function createJobsData(alias: string, contractAddress: string, functionSignature: string) {
  return { alias, contractAddress, functionSignature };
}

const rows = [
  createJobsData('Job 001', '0xA99...9526', '0xabcd1234'),
  createJobsData('-', '0xA99...9525', '0xabcd1234'),
  createJobsData('Job 002', '0xA99...9524', '0xabcd1234'),
];

export const EnabledJobs = () => {
  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Enabled Jobs</Title>

        <JobModal>
          <SButton variant='contained'>Add New Job</SButton>
        </JobModal>
      </SectionHeader>

      <TableContainer>
        <STable aria-label='simple table'>
          <TableHead>
            <TableRow>
              <ColumnTitle>Alias</ColumnTitle>
              <ColumnTitle align='right'>ContractAddress</ColumnTitle>
              <ColumnTitle align='right'>Function Signature</ColumnTitle>
              <ColumnTitle align='right'></ColumnTitle>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <STableRow key={row.contractAddress}>
                <RowText component='th' scope='row'>
                  <STooltip text='Edit alias'>{row.alias}</STooltip>
                </RowText>

                <RowText align='right'>
                  <STooltip text={row.contractAddress}>{row.contractAddress}</STooltip>
                </RowText>

                <RowText align='right'>
                  <STooltip text={row.functionSignature}>{row.functionSignature}</STooltip>
                </RowText>

                <RowText align='right'>
                  <OptionsMenu type='job' value={row.contractAddress} />
                </RowText>
              </STableRow>
            ))}
          </TableBody>
        </STable>
      </TableContainer>
    </SCard>
  );
};
