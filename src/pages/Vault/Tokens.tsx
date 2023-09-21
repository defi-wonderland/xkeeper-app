import {
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
} from '@mui/material';
import { WithdrawtModal, DepositModal } from '~/containers';
import { useStateContext } from '~/hooks';

function createTokenData(tokenName: string, amount: string, value: string) {
  return { tokenName, amount, value };
}

const rows = [
  createTokenData('ETH', '12.26 ETH', '$12,000'),
  createTokenData('WBTC', '12.26 WBTC', '$12,000'),
  createTokenData('DAI', '12.26 DAI', '$12,000'),
];

export const Tokens = () => {
  const totalValueInUsd = '$12,000';

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Box>
          <Title>Tokens</Title>

          <TotalValue>
            Total Value: <span>{totalValueInUsd}</span>
          </TotalValue>
        </Box>

        <ButtonsContainer>
          <WithdrawtModal>
            <SWithdrawButton variant='outlined'>Withdraw funds</SWithdrawButton>
          </WithdrawtModal>

          <DepositModal>
            <SDepositButton variant='contained'>Deposit funds</SDepositButton>
          </DepositModal>
        </ButtonsContainer>
      </SectionHeader>

      <TableContainer>
        <STable aria-label='tokens table'>
          <TableHead>
            <TableRow>
              <SColumnTitle>Token Name</SColumnTitle>
              <ColumnTitle align='left'>Amount</ColumnTitle>
              <ColumnTitle align='left'>Value (USD)</ColumnTitle>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <STableRow key={row.tokenName}>
                <SRowText component='th' scope='row'>
                  {row.tokenName}
                </SRowText>
                <RowText align='left'>{row.amount}</RowText>
                <RowText align='left'>{row.value}</RowText>
              </STableRow>
            ))}
          </TableBody>
        </STable>
      </TableContainer>
    </SCard>
  );
};

export const SCard = styled(Card)(() => {
  const {
    currentTheme: { borderRadius },
  } = useStateContext();
  return {
    padding: '2rem 3.2rem 0',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    boxShadow: '0px 2px 10px 0px rgba(16, 24, 40, 0.02)',
    marginTop: '2.4rem',
    borderRadius: borderRadius,
  };
});

export const SectionHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '2.4rem',
});

export const Title = styled(Typography)({
  fontSize: '2rem',
  lineHeight: '3rem',
  fontWeight: 700,
});

const TotalValue = styled(Typography)(() => {
  const {
    currentTheme: { textDisabled },
  } = useStateContext();
  return {
    color: textDisabled,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 400,
    span: {
      fontWeight: 500,
    },
  };
});

const ButtonsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '0.8rem',
});

export const ColumnTitle = styled(TableCell)(() => {
  const {
    currentTheme: { textDisabled },
  } = useStateContext();
  return {
    fontSize: '1.2rem',
    padding: '2.4rem 1.6rem',
    color: textDisabled,
  };
});

export const STable = styled(Table)({
  minWidth: '65rem',
});

export const RowText = styled(TableCell)(() => {
  const {
    currentTheme: { textSecondary },
  } = useStateContext();
  return {
    fontSize: '1.4rem',
    height: '3.2rem',
    fontWeight: 500,
    padding: '2.4rem 1.6rem',
    color: textSecondary,
  };
});

export const STableRow = styled(TableRow)({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
});

const SWithdrawButton = styled(Button)(() => {
  const {
    currentTheme: { borderRadius, textSecondaryDisabled },
  } = useStateContext();
  return {
    color: 'inherit',
    borderColor: textSecondaryDisabled,
    borderRadius: borderRadius,
    fontSize: '1.4rem',
    textTransform: 'none',
    padding: '1rem 1.6rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: textSecondaryDisabled,
    },
  };
});

const SDepositButton = styled(Button)(() => {
  const {
    currentTheme: { borderRadius, actionButton },
  } = useStateContext();

  return {
    borderRadius: borderRadius,
    backgroundColor: actionButton,
    fontSize: '1.4rem',
    textTransform: 'none',
    padding: '1rem 1.6rem',
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: actionButton,
    },
  };
});

const SColumnTitle = styled(TableCell)({
  width: '33rem',
});

const SRowText = styled(TableCell)({
  width: '33rem',
});
