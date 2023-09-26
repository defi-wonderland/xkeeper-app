import { TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

import { SectionHeader, SCard, Title, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, OptionsMenu, ActiveButton } from '~/components';
import { RelayModal } from '~/containers';

function createRelaysData(alias: string, contractAddress: string, enabledCallers: string) {
  return { alias, contractAddress, enabledCallers };
}

const rows = [
  createRelaysData('Gelato Relat', '0xA99...9526', '0xA99...9526'),
  createRelaysData('Tom Relay (Open Relay)', '0xA99...9525', '0xA99...9526'),
  createRelaysData('-', '0xA99...9524', '0xA99...9526'),
];

export const EnabledRelays = () => {
  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Enabled Relays</Title>

        <RelayModal>
          <ActiveButton variant='contained'>Add New Relay</ActiveButton>
        </RelayModal>
      </SectionHeader>

      <TableContainer>
        <STable aria-label='simple table'>
          <TableHead>
            <TableRow>
              <ColumnTitle>Alias</ColumnTitle>
              <ColumnTitle align='right'>Contract Address</ColumnTitle>
              <ColumnTitle align='right'>Enabled Callers</ColumnTitle>
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

                <RowText align='right'>{row.enabledCallers}</RowText>

                <RowText align='right'>
                  <OptionsMenu type='relay' value={row.contractAddress} />
                </RowText>
              </STableRow>
            ))}
          </TableBody>
        </STable>
      </TableContainer>
    </SCard>
  );
};
