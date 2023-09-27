import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { ActiveButton, OptionsMenu, STooltip } from '~/components';
import { ColumnTitle, SCard, SectionHeader, Title, RowText, STableRow, STable } from './Tokens';
import { useStateContext } from '~/hooks';
import { ModalType } from '~/types';

function createJobsData(alias: string, contractAddress: string, functionSignature: string) {
  return { alias, contractAddress, functionSignature };
}

const rows = [
  createJobsData('Job 001', '0xA99...9526', '0xabcd1234'),
  createJobsData('-', '0xA99...9525', '0xabcd1234'),
  createJobsData('Job 002', '0xA99...9524', '0xabcd1234'),
];

export const EnabledJobs = () => {
  const { userAddress, setModalOpen } = useStateContext();

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Enabled Jobs</Title>

        <ActiveButton variant='contained' disabled={!userAddress} onClick={() => setModalOpen(ModalType.ADD_JOB)}>
          Add New Job
        </ActiveButton>
      </SectionHeader>

      <TableContainer>
        <STable aria-label='simple table'>
          <TableHead>
            <TableRow>
              <SColumnTitle>Alias</SColumnTitle>
              <ColumnTitle align='left'>ContractAddress</ColumnTitle>
              <ColumnTitle align='left'>Function Signature</ColumnTitle>
              <ColumnTitle align='right'></ColumnTitle>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <STableRow key={row.contractAddress}>
                <RowText component='th' scope='row'>
                  <STooltip text='Edit alias'>{row.alias}</STooltip>
                </RowText>

                <RowText align='left'>
                  <STooltip text={row.contractAddress}>{row.contractAddress}</STooltip>
                </RowText>

                <RowText align='left'>
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

const SColumnTitle = styled(ColumnTitle)({
  width: '28rem',
});
