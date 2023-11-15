import { useCallback, useEffect, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import { Hex } from 'viem';

import { SectionHeader, Title, SCard, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, StyledText, SPagination, IconContainer, Icon } from '~/components';
import { NoDataContainer } from './EnabledRelays';
import { Text } from './EnabledJobs';
import { useStateContext } from '~/hooks';
import { EventData } from '~/types';
import {
  copyData,
  formatDataNumber,
  formatTimestamp,
  getCustomClient,
  getTimestamp,
  getUsdBalance,
  getVaultEvents,
  handleOpenTx,
  itemsPerPage,
  truncateAddress,
} from '~/utils';

function createEventData(activity: string, hash: Hex, date: string, tokenAddress?: string, amount?: string): EventData {
  return { activity, hash, tokenAddress, amount, date };
}

export const Activity = () => {
  const { currentTheme, currentNetwork, selectedVault, vaults, userAddress, setVaults, setSelectedVault } =
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
  }, [events, vaults, selectedVault, setVaults]);

  // Load events when there are no events loaded in the selected vault
  const getEvents = useCallback(async () => {
    if (selectedVault?.events?.length) return;
    try {
      setIsLoaded(false);
      const publicClient = getCustomClient(currentNetwork.id, userAddress);
      const events = await getVaultEvents(publicClient, 0n, selectedVault?.address);

      const timestampPromises = events.map(async (event) => {
        const timestamp = await getTimestamp(publicClient, event.blockNumber);

        return createEventData(
          event.eventName,
          event.transactionHash,
          timestamp,
          (event.args as { _token?: string })?._token,
          (event.args as { _amount?: string })?._amount?.toString(),
        );
      });

      const eventsWithTimestamps = await Promise.all(timestampPromises);

      setEvents(eventsWithTimestamps.reverse()); // Reverse to show latest events first
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
                <SColumnTitle>Activity</SColumnTitle>
                <SColumnTitle align='left'>Tx Hash</SColumnTitle>
                <SColumnTitle align='left'>Token</SColumnTitle>
                <SColumnTitle align='left'>Amount</SColumnTitle>
                <SColumnTitle align='left'>Date & Time</SColumnTitle>
                <SColumnTitle align='left'></SColumnTitle>
              </TableRow>
            </TableHead>

            <TableBody>
              {events.slice(paging.from, paging.to).map((row, index) => (
                <STableRow key={row.hash + index}>
                  {/* Activity*/}
                  <ActivityRowText component='th' scope='row'>
                    <Text>{row.activity}</Text>
                  </ActivityRowText>

                  {/* Tx Hash */}
                  <HashRow align='left'>
                    <STooltip text={row.hash} address>
                      <Text onClick={() => handleOpenTx(currentNetwork.scanner, row.hash)}>
                        {truncateAddress(row.hash)}
                      </Text>
                    </STooltip>
                  </HashRow>

                  {/* Token */}
                  <SymbolRow align='left' onClick={() => copyData(row?.tokenAddress)}>
                    <STooltip text={row?.tokenAddress} address>
                      <Text>
                        {getTokenValues(row?.tokenAddress, row?.amount).symbol || truncateAddress(row?.tokenAddress, 2)}
                      </Text>
                    </STooltip>
                  </SymbolRow>

                  {/* Amount */}
                  <AmountRow align='left' onClick={() => copyData(row?.amount)}>
                    <STooltip text={getTokenValues(row?.tokenAddress, row?.amount).usdValue}>
                      <Text>{getTokenValues(row?.tokenAddress, row?.amount).amount}</Text>
                    </STooltip>
                  </AmountRow>

                  {/* Date & Time */}
                  <DateRowText align='left'>
                    <Text>{formatTimestamp(row.date)}</Text>
                  </DateRowText>

                  {/* External link button */}
                  <RowText align='left'>
                    <SIconContainer onClick={() => handleOpenTx(currentNetwork.scanner, row.hash)}>
                      <Icon name='external-link' color={currentTheme.textDisabled} size='1.6rem' />
                    </SIconContainer>
                  </RowText>
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

const SColumnTitle = styled(ColumnTitle)({
  padding: '1.6rem 1.8rem',
});

const SRowText = styled(RowText)(() => {
  return {
    padding: '1.6rem 1.8rem',
    minWidth: '10rem',
  };
});

const HashRow = styled(SRowText)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.infoChipColor,
    cursor: 'pointer',
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

const SIconContainer = styled(IconContainer)(() => {
  return {
    cursor: 'pointer',
  };
});
