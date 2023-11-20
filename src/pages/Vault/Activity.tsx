import { useCallback, useEffect, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { SectionHeader, Title, SCard, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, StyledText, SPagination } from '~/components';
import { NoDataContainer } from './EnabledRelays';
import { useStateContext } from '~/hooks';
import { Text } from './EnabledJobs';
import { EventData } from '~/types';
import {
  formatDataNumber,
  getCustomClient,
  getUsdBalance,
  getVaultEvents,
  handleOpenAddress,
  handleOpenTx,
  itemsPerPage,
  truncateAddress,
} from '~/utils';

export const Activity = () => {
  const { currentNetwork, selectedVault, vaults, userAddress, aliasData, setVaults, setSelectedVault } =
    useStateContext();
  const [events, setEvents] = useState<EventData[]>(selectedVault?.events || []);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [paging, setPaging] = useState({ from: 0, to: itemsPerPage });

  // Update vault events data in vaults array
  const updateVaultEvents = useCallback(() => {
    const updatedVaults = vaults?.map((vault) => {
      if (vault.address === selectedVault?.address) {
        const newSelectedVaultData = { ...selectedVault, events };
        setSelectedVault(newSelectedVaultData);
        return newSelectedVaultData;
      }
      return vault;
    });
    setVaults(updatedVaults);

    // This is needed to avoid infinite loop when events are updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, selectedVault, setVaults]);

  // Load events when there are no events loaded in the selected vault
  const getEvents = useCallback(async () => {
    if (selectedVault?.events?.length) return;
    try {
      setIsLoaded(false);
      const publicClient = getCustomClient(currentNetwork.id, userAddress);
      const events = await getVaultEvents(publicClient, 0n, selectedVault?.address);

      setEvents(events.reverse()); // Reverse to show latest events first
      setIsLoaded(true);
      setIsError(false);
    } catch (error) {
      console.error('Error loading activity:', error);
      setIsError(true);
    }
  }, [currentNetwork.id, selectedVault?.address, selectedVault?.events?.length, userAddress]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  // Update vaults data when events are loaded
  useEffect(() => {
    if (events.length && !selectedVault?.events?.length) {
      updateVaultEvents();
    }
  }, [events, selectedVault?.events?.length, updateVaultEvents]);

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
    return `${amount}wei ${data.symbol} to ${truncateAddress(recipient)}`;
  };

  const formatTextAmount = (tokenAddress: string, amount: string) => {
    const data = getTokenValues(tokenAddress, amount);
    return `${data.amount} ${data.symbol || truncateAddress(tokenAddress, 2)}`;
  };

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Activity</Title>
      </SectionHeader>

      {!!events.length && (
        <TableContainer>
          <STable aria-label='simple table'>
            <TableHead>
              <TableRow>
                <SColumnTitle>Hash</SColumnTitle>
                <SColumnTitle align='left'>Jobs</SColumnTitle>
                <SColumnTitle align='left'>Relay</SColumnTitle>
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
                        {truncateAddress(row.hash, 2)}
                      </SText>
                    </STooltip>
                  </HashRow>

                  {/* Job */}
                  <SymbolRow align='left'>
                    {row.jobs.map((job, index) => (
                      <STooltip key={job.job + index} text={job.job} address>
                        <SText onClick={() => handleOpenAddress(currentNetwork.scanner, job.job)}>
                          {aliasData[job.job] || truncateAddress(job.job, 2)}
                        </SText>
                      </STooltip>
                    ))}
                  </SymbolRow>

                  {/* Relay */}
                  <HashRow align='left'>
                    <STooltip text={row.jobs[0].relay} address>
                      <SText onClick={() => handleOpenAddress(currentNetwork.scanner, row.jobs[0].relay)}>
                        {aliasData[row.jobs[0].relay] || truncateAddress(row.jobs[0].relay, 2)}
                      </SText>
                    </STooltip>
                  </HashRow>

                  {/* Caller */}
                  <HashRow align='left'>
                    <STooltip text={row.jobs[0].relayCaller} address>
                      <SText onClick={() => handleOpenAddress(currentNetwork.scanner, row.jobs[0].relayCaller)}>
                        {truncateAddress(row.jobs[0].relayCaller, 2)}
                      </SText>
                    </STooltip>
                  </HashRow>

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
        <NoDataContainer>
          <StyledText>
            {isLoaded && isError && 'Error loading activity.'}
            {isLoaded && !isError && 'No activity found.'}
            {!isLoaded && 'Loading activity...'}
          </StyledText>
        </NoDataContainer>
      )}
    </SCard>
  );
};

const SText = styled(Text)({
  maxWidth: '12rem',
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
  const { currentTheme } = useStateContext();
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
    minWidth: '12rem',
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
    padding: '2.8rem 1rem',
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
