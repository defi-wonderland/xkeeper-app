import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { ColumnTitle, SCard, SectionHeader, Title, RowText, STableRow, STable } from './Tokens';
import { ActiveButton, OptionsMenu, STooltip } from '~/components';
import { useStateContext } from '~/hooks';
import { truncateAddress } from '~/utils';
import { ModalType } from '~/types';

function createJobsData(alias: string, contractAddress: string, functionSignature: string[]) {
  return { alias, contractAddress, functionSignature };
}

export const EnabledJobs = () => {
  const { userAddress, setModalOpen, selectedVault } = useStateContext();
  const selectedJobs = selectedVault?.jobs || {};

  const jobs = Object.keys(selectedJobs).map((key) => createJobsData('Test', key, selectedJobs[key]));

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Enabled Jobs</Title>

        {selectedVault?.owner === userAddress && (
          <ActiveButton variant='contained' disabled={!userAddress} onClick={() => setModalOpen(ModalType.ADD_JOB)}>
            Add New Job
          </ActiveButton>
        )}
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
            {jobs.map((row) => (
              <STableRow key={row.contractAddress}>
                <RowText component='th' scope='row'>
                  <STooltip text='Edit alias'>{row.alias}</STooltip>
                </RowText>

                <RowText align='left'>
                  <STooltip text={row.contractAddress} address>
                    {truncateAddress(row.contractAddress)}
                  </STooltip>
                </RowText>

                <RowText align='left'>
                  {row.functionSignature?.map((signature) => (
                    <STooltip text={signature} address key={signature}>
                      <Text>{signature}</Text>
                    </STooltip>
                  ))}
                </RowText>

                <RowText align='right'>
                  <OptionsMenu type='job' address={row.contractAddress} params={row.functionSignature} />
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

export const Text = styled('p')({
  display: 'inline-block',
  margin: '0 100% 0 0',
});
