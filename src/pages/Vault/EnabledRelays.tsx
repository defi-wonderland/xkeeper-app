import { TableBody, TableContainer, TableHead, TableRow, Button, styled } from '@mui/material';

import { SectionHeader, SCard, Title, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { useStateContext } from '~/hooks';

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

        <SButton variant='contained'>Add New Relay</SButton>
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
                  {row.alias}
                </RowText>
                <RowText align='right'>{row.contractAddress}</RowText>
                <RowText align='right'>{row.enabledCallers}</RowText>
                <RowText align='right'>Test</RowText>
              </STableRow>
            ))}
          </TableBody>
        </STable>
      </TableContainer>
    </SCard>
  );
};

export const SButton = styled(Button)(() => {
  const {
    currentTheme: { borderRadius, actionButton },
  } = useStateContext();
  return {
    fontSize: '1.4rem',
    textTransform: 'none',
    padding: '1rem 1.6rem',
    boxShadow: 'none',
    borderRadius: borderRadius,
    backgroundColor: actionButton,
    '&:hover': {
      backgroundColor: actionButton,
    },
  };
});
