import { useEffect, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { SectionHeader, Title, SCard, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { useStateContext } from '~/hooks';
import { STooltip, StyledText } from '~/components';
import { Text } from './EnabledJobs';
import { publicClient } from '~/config';
import { vaultABI } from '~/generated';
import { Hex } from 'viem';
import { copyData, formatDataNumber, formatTimestamp, handleOpenTx, truncateAddress } from '~/utils';
import { NoDataContainer } from './EnabledRelays';

export interface EventData {
  activity: string;
  hash: Hex;
  date: string;
  tokenAddress?: string;
  amount?: string;
}

function createEventData(activity: string, hash: Hex, date: string, tokenAddress?: string, amount?: string): EventData {
  return { activity, hash, tokenAddress, amount, date };
}

export const Activity = () => {
  const { currentNetwork, selectedVault } = useStateContext();
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const vaultAddress = selectedVault?.address || '0x';

  useEffect(() => {
    const getEvents = async () => {
      try {
        setIsLoaded(false);
        const events = await publicClient.getContractEvents({
          address: vaultAddress,
          abi: vaultABI,
          fromBlock: 0n,
        });

        const getTimestamp = async (blockNumber: bigint) => {
          const blockData = await publicClient.getBlock({ blockNumber });
          return blockData.timestamp.toString();
        };

        const timestampPromises = events.map(async (event) => {
          const timestamp = await getTimestamp(event.blockNumber);

          return createEventData(
            event.eventName,
            event.transactionHash,
            timestamp,
            (event.args as { _token?: string })?._token,
            (event.args as { _amount?: string })?._amount?.toString(),
          );
        });

        const eventWithTimestamps = await Promise.all(timestampPromises);

        setEvents(eventWithTimestamps.reverse()); // Reverse to show latest events first
        setIsLoaded(true);
        setIsError(false);
      } catch (error) {
        console.error('Error loading activity:', error);
        setIsError(true);
      }
    };

    getEvents();
  }, [vaultAddress]);

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
              {events.map((row) => (
                <STableRow key={row.hash}>
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
