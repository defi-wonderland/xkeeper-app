import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import { Address } from 'viem';

import { SectionHeader, SCard, Title, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, OptionsMenu, ActiveButton } from '~/components';
import { useStateContext } from '~/hooks';
import { truncateAddress } from '~/utils';
import { ModalType } from '~/types';
import { Text } from './EnabledJobs';

function createRelaysData(alias: string, contractAddress: string, enabledCallers: Address[]) {
  return { alias, contractAddress, enabledCallers };
}

export const EnabledRelays = () => {
  const { userAddress, setModalOpen, selectedVault } = useStateContext();
  const selectedRelays = selectedVault?.relays || {};

  const relays = Object.keys(selectedRelays).map((key) => createRelaysData('Test', key, selectedRelays[key]));

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Enabled Relays</Title>

        {selectedVault?.owner === userAddress && (
          <ActiveButton variant='contained' onClick={() => setModalOpen(ModalType.ADD_RELAY)}>
            Add New Relay
          </ActiveButton>
        )}
      </SectionHeader>

      {!!relays.length && (
        <TableContainer>
          <STable aria-label='simple table'>
            <TableHead>
              <TableRow>
                <SColumnTitle>Alias</SColumnTitle>
                <ColumnTitle align='left'>Contract Address</ColumnTitle>
                <ColumnTitle align='left'>Enabled Callers</ColumnTitle>
                <ColumnTitle align='left'></ColumnTitle>
              </TableRow>
            </TableHead>

            <TableBody>
              {relays.map((row) => (
                <STableRow key={row.contractAddress}>
                  <RowText component='th' scope='row'>
                    <STooltip text='Edit alias'>{row.alias}</STooltip>
                  </RowText>

                  <RowText align='left'>
                    <STooltip text={row.contractAddress} address>
                      {truncateAddress(row.contractAddress)}
                    </STooltip>
                  </RowText>

                  <RowText align='left'>
                    {row.enabledCallers?.map((caller) => (
                      <STooltip text={caller} address key={caller}>
                        <Text>{truncateAddress(caller)}</Text>
                      </STooltip>
                    ))}
                  </RowText>

                  <RowButton align='right'>
                    <OptionsMenu type='relay' address={row.contractAddress} params={row.enabledCallers} />
                  </RowButton>
                </STableRow>
              ))}
            </TableBody>
          </STable>
        </TableContainer>
      )}
    </SCard>
  );
};

const SColumnTitle = styled(ColumnTitle)({
  width: '28rem',
});

export const RowButton = styled(RowText)(() => {
  const { currentTheme } = useStateContext();
  return {
    padding: '0rem',
    minWidth: '8rem',
    '&:hover': {
      transition: 'all 0.2s ease-in-out',
      backgroundColor: currentTheme.backgroundHover,
    },
    button: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
});
