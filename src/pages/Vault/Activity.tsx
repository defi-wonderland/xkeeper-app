import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { SectionHeader, Title, SCard, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { useStateContext } from '~/hooks';

function createActivityData(tokenName: string, amount: string, value: string) {
  return { tokenName, amount, value };
}

const rows = [
  createActivityData('ETH', '12.26 ETH', '$12,000'),
  createActivityData('WBTC', '12.26 WBTC', '$12,000'),
  createActivityData('DAI', '12.26 DAI', '$12,000'),
];

export const Activity = () => {
  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Activity</Title>
      </SectionHeader>

      <TableContainer>
        <STable aria-label='simple table'>
          <TableHead>
            <TableRow>
              <ColumnTitle>Activity</ColumnTitle>
              <ColumnTitle align='right'>Tx Hash</ColumnTitle>
              <ColumnTitle align='right'>Token</ColumnTitle>
              <ColumnTitle align='right'>Amount</ColumnTitle>
              <ColumnTitle align='right'>Date & Time</ColumnTitle>
              <ColumnTitle align='right'></ColumnTitle>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <STableRow key={row.tokenName}>
                <RowText component='th' scope='row'>
                  {row.tokenName}
                </RowText>
                <SRowText align='right'>{row.amount}</SRowText>
                <RowText align='right'>{row.value}</RowText>
                <RowText align='right'>{row.value}</RowText>
                <RowText align='right'>{row.value}</RowText>
                <RowText align='right'>test</RowText>
              </STableRow>
            ))}
          </TableBody>
        </STable>
      </TableContainer>
    </SCard>
  );
};

const SRowText = styled(RowText)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.infoChipColor,
  };
});
