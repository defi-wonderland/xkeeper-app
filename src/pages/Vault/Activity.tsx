import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { SectionHeader, Title, SCard, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { useStateContext } from '~/hooks';
import { Icon, IconContainer } from '~/components';
import { Text } from './EnabledJobs';

function createActivityData(tokenName: string, amount: string, value: string) {
  return { tokenName, amount, value };
}

const rows = [
  createActivityData('ETH', '12.26 ETH', '$12,000'),
  createActivityData('WBTC', '12.26 WBTC', '$12,000'),
  createActivityData('DAI', '12.26 DAI', '$12,000'),
];

export const Activity = () => {
  const { currentTheme } = useStateContext();
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
              <ColumnTitle align='left'>Tx Hash</ColumnTitle>
              <ColumnTitle align='left'>Token</ColumnTitle>
              <ColumnTitle align='left'>Amount</ColumnTitle>
              <ColumnTitle align='left'>Date & Time</ColumnTitle>
              <ColumnTitle align='left'></ColumnTitle>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <STableRow key={row.tokenName}>
                {/* Activity*/}
                <RowText component='th' scope='row'>
                  <Text>{row.tokenName}</Text>
                </RowText>

                {/* Tx Hash */}
                <RowText align='left'>
                  <Text>{row.amount}</Text>
                </RowText>

                {/* Token */}
                <SRowText align='left'>
                  <Text>{row.amount}</Text>
                </SRowText>

                {/* Amount */}
                <RowText align='left'>
                  <Text>{row.value}</Text>
                </RowText>

                {/* Date & Time */}
                <RowText align='left'>
                  <Text>{row.value}</Text>
                </RowText>

                {/* External link button */}
                <RowText align='left'>
                  <IconContainer>
                    <Icon name='external-link' color={currentTheme.textDisabled} size='1.6rem' />
                  </IconContainer>
                </RowText>
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
