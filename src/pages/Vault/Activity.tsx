import { useCallback, useEffect, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import { Hex } from 'viem';

import { SectionHeader, Title, SCard, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, StyledText } from '~/components';
import { NoDataContainer } from './EnabledRelays';
import { Text } from './EnabledJobs';
import { useStateContext } from '~/hooks';
import { publicClient } from '~/config';
import { EventData } from '~/types';
import {
  copyData,
  formatDataNumber,
  formatTimestamp,
  getTimestamp,
  getVaultEvents,
  handleOpenTx,
  truncateAddress,
} from '~/utils';

function createEventData(activity: string, hash: Hex, date: string, tokenAddress?: string, amount?: string): EventData {
  return { activity, hash, tokenAddress, amount, date };
}

export const Activity = () => {
  const { currentNetwork, selectedVault, vaults, setVaults, setSelectedVault } = useStateContext();
  const [events, setEvents] = useState<EventData[]>(selectedVault?.events || []);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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
  }, [events, vaults, selectedVault, setSelectedVault, setVaults]);

  // Load events when there are no events loaded in the selected vault
  const getEvents = useCallback(async () => {
    if (selectedVault?.events?.length) return;
    try {
      setIsLoaded(false);
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
  }, [selectedVault?.address, selectedVault?.events?.length]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  // Update vaults data when events are loaded
  useEffect(() => {
    if (events.length && !selectedVault?.events?.length) {
      updateVaultEvents();
    }
  }, [events, selectedVault?.events?.length, updateVaultEvents]);

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
                {/* Temporary disabled */}
                {/* <SColumnTitle align='left'></SColumnTitle> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {events.map((row, index) => (
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
                  <AddressRow align='left' onClick={() => copyData(row?.tokenAddress)}>
                    <STooltip text={row?.tokenAddress} address>
                      {/* TODO: print token symbol instead of token address */}
                      <Text>{row?.tokenAddress ? truncateAddress(row.tokenAddress) : '-'}</Text>
                    </STooltip>
                  </AddressRow>

                  {/* Amount */}
                  <SRowText align='left' onClick={() => copyData(row?.amount)}>
                    <STooltip text={row?.amount}>
                      <Text>{row?.amount ? formatDataNumber(row.amount, 18, 2, false, true) : '-'}</Text>
                    </STooltip>
                  </SRowText>

                  {/* Date & Time */}
                  <DateRowText align='left'>
                    <Text>{formatTimestamp(row.date)}</Text>
                  </DateRowText>

                  {/* Temporary disabled */}
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
        </TableContainer>
      )}

      {!events.length && !isLoaded && (
        <NoDataContainer>
          <StyledText>Loading activity...</StyledText>
        </NoDataContainer>
      )}

      {!events.length && isLoaded && (
        <NoDataContainer>
          <StyledText>
            {isError && 'Error loading activity.'}
            {!isError && 'No activity found.'}
          </StyledText>
        </NoDataContainer>
      )}
    </SCard>
  );
};

const SColumnTitle = styled(ColumnTitle)({
  padding: '1.6rem 1rem',
});

const SRowText = styled(RowText)(() => {
  return {
    padding: '1.6rem 1rem',
    minWidth: '10rem',
  };
});

const HashRow = styled(SRowText)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.infoChipColor,
    minWidth: '12rem',
    cursor: 'pointer',
  };
});

const AddressRow = styled(SRowText)(() => {
  return {
    minWidth: '12rem',
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
  };
});

// temporary disabled
// const SIconContainer = styled(IconContainer)(() => {
//   return {
//     cursor: 'pointer',
//   };
// });
