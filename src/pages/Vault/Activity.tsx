import { useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { SectionHeader, SCard, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, StyledText, SPagination, StyledTitle } from '~/components';
import { useAlias, useFetchVaultActivity, useStateContext, useTheme } from '~/hooks';
import { NoDataContainer } from '~/containers';
import { Status } from '~/types';
import {
  formatDataNumber,
  getRelayName,
  getUsdBalance,
  handleOpenAddress,
  handleOpenTx,
  itemsPerPage,
  truncateAddress,
} from '~/utils';

export const Activity = () => {
  const { currentNetwork, selectedVault } = useStateContext();
  const { aliasData } = useAlias();
  const { requestStatus, data: events } = useFetchVaultActivity();

  const [paging, setPaging] = useState({ from: 0, to: itemsPerPage });

  const getTokenValues = (tokenAddress?: string, amount?: string) => {
    const token = selectedVault?.tokens.find((token) => token.address === tokenAddress);
    const price = token?.price || 0;
    const decimals = token?.decimals || 18;
    const symbol = token?.symbol || undefined;
    const usdValue = getUsdBalance(price, amount || '0', decimals);
    const formattedUsdValue = amount ? formatDataNumber(usdValue, 18, 2, true, true) : undefined;
    const formattedAmount = amount ? formatDataNumber(amount, 18, 2, false, true) : '-';

    return { usdValue: formattedUsdValue, symbol, amount: formattedAmount, decimals };
  };

  const formatAmountTooltip = (tokenAddress: string, amount: string, recipient: string) => {
    const data = getTokenValues(tokenAddress, amount);
    return `${amount} wei ${data.symbol} to ${truncateAddress(recipient)}`;
  };

  const formatTextAmount = (tokenAddress: string, amount: string) => {
    const data = getTokenValues(tokenAddress, amount);
    return `${data.amount} ${data.symbol || truncateAddress(tokenAddress, 2)}`;
  };

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <StyledTitle>Activity</StyledTitle>
      </SectionHeader>

      {!!events.length && (
        <TableContainer>
          <STable aria-label='simple table'>
            <TableHead>
              <TableRow>
                <SColumnTitle>Hash</SColumnTitle>
                <SColumnTitle align='left'>Relay</SColumnTitle>
                <SColumnTitle align='left'>Jobs</SColumnTitle>
                <SColumnTitle align='left'>Caller</SColumnTitle>
                <SColumnTitle align='left'>Payment</SColumnTitle>
                <SColumnTitle align='left'>Date & Time</SColumnTitle>

                {/* temporary commented */}
                {/* <SColumnTitle align='left'></SColumnTitle> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {events.slice(paging.from, paging.to).map((row, index) => (
                <STableRow key={row.hash + index}>
                  {/* Hash */}
                  <HashRow align='left'>
                    <STooltip text={row.hash} address>
                      <SText onClick={() => handleOpenTx(currentNetwork.scanner, row.hash)}>
                        {truncateAddress(row.hash, 4)}
                      </SText>
                    </STooltip>
                  </HashRow>

                  {/* Relay */}
                  <SymbolRow align='left'>
                    <STooltip text={row.jobs[0].relay} address>
                      <SText onClick={() => handleOpenAddress(currentNetwork.scanner, row.jobs[0].relay)}>
                        {getRelayName(row.jobs[0].relay, currentNetwork?.id) ||
                          aliasData[row.jobs[0].relay] ||
                          truncateAddress(row.jobs[0].relay, 4)}
                      </SText>
                    </STooltip>
                  </SymbolRow>

                  {/* Job */}
                  <SymbolRow align='left'>
                    {row.jobs.map((job, index) => (
                      <STooltip key={job.job + index} text={job.job} address>
                        <SText onClick={() => handleOpenAddress(currentNetwork.scanner, job.job)}>
                          {aliasData[job.job] || truncateAddress(job.job, 4)}
                        </SText>
                      </STooltip>
                    ))}
                  </SymbolRow>

                  {/* Caller */}
                  <SymbolRow align='left'>
                    <STooltip text={row.jobs[0].relayCaller} address>
                      <SText onClick={() => handleOpenAddress(currentNetwork.scanner, row.jobs[0].relayCaller)}>
                        {truncateAddress(row.jobs[0].relayCaller, 4)}
                      </SText>
                    </STooltip>
                  </SymbolRow>

                  {/* Amount */}
                  <AmountRow align='left'>
                    {row.payments.map((feeData, index) => (
                      <STooltip
                        key={feeData.feeToken + index}
                        text={formatAmountTooltip(feeData.feeToken, feeData.feeAmount, feeData.feeRecipient)}
                      >
                        <AmountText>{formatTextAmount(feeData.feeToken, feeData.feeAmount)}</AmountText>
                      </STooltip>
                    ))}

                    {!row.payments.length && <SText>-</SText>}
                  </AmountRow>

                  {/* Date & Time */}
                  <DateRowText align='left'>
                    <SText>{row.date}</SText>
                  </DateRowText>

                  {/* temproary commented */}
                  {/* External link button */}
                  {/* <RowText align='left'>
                    <SIconContainer onClick={() => handleOpenTx(currentNetwork.scanner, row.hash)}>
                      <Icon name='external-link' color={currentTheme.textDisabled} size='1.6rem' />
                    </SIconContainer>
                  </RowText> */}
                </STableRow>
              ))}
            </TableBody>
          </STable>
          <SPagination numberOfItems={events.length} perPage={itemsPerPage} setPaging={setPaging} />
        </TableContainer>
      )}

      {!events.length && (
        <NoDataContainer dataTest='no-activity'>
          <StyledText>
            {requestStatus === Status.ERROR && 'Error loading activity.'}
            {requestStatus === Status.SUCCESS && 'No activity found.'}
            {requestStatus === Status.LOADING && 'Loading activity...'}
          </StyledText>
        </NoDataContainer>
      )}
    </SCard>
  );
};

const Text = styled('p')({
  display: 'block',
  margin: '0.2rem 0',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '20rem',
});

const SText = styled(Text)({
  maxWidth: '14rem',
});

const SColumnTitle = styled(ColumnTitle)({
  padding: '1.2rem 1.4rem',
});

const SRowText = styled(RowText)(() => {
  return {
    padding: '1.2rem 1.4rem',
    minWidth: '10rem',
  };
});

const HashRow = styled(SRowText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.infoChipColor,
    cursor: 'pointer',
    minWidth: '12rem',
  };
});

const SymbolRow = styled(SRowText)(() => {
  return {
    cursor: 'pointer',
  };
});

const AmountRow = styled(SRowText)(() => {
  return {
    cursor: 'pointer',
    minWidth: '9rem',
  };
});

const ActivityRowText = styled(SRowText)(() => {
  return {
    minWidth: '16rem',
  };
});

const DateRowText = styled(ActivityRowText)(() => {
  return {
    minWidth: '15rem',
    padding: '2.8rem 0 2.8rem 1rem',
  };
});

const AmountText = styled(Text)(() => {
  return {
    fontSize: '1.3rem',
  };
});

// temporary commented
// const SIconContainer = styled(IconContainer)(() => {
//   return {
//     cursor: 'pointer',
//   };
// });
