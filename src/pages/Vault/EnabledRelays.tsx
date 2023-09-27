import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { SectionHeader, SCard, Title, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, OptionsMenu, ActiveButton } from '~/components';
import { useStateContext } from '~/hooks';
import { ModalType } from '~/types';

function createRelaysData(alias: string, contractAddress: string, enabledCallers: string) {
  return { alias, contractAddress, enabledCallers };
}

const rows = [
  createRelaysData('Gelato Relat', '0xA99...9526', '0xA99...9526'),
  createRelaysData('Tom Relay (Open Relay)', '0xA99...9525', '0xA99...9526'),
  createRelaysData('-', '0xA99...9524', '0xA99...9526'),
];

export const EnabledRelays = () => {
  const { userAddress, setModalOpen } = useStateContext();

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Enabled Relays</Title>

        <ActiveButton variant='contained' disabled={!userAddress} onClick={() => setModalOpen(ModalType.ADD_RELAY)}>
          Add New Relay
        </ActiveButton>
      </SectionHeader>

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
            {rows.map((row) => (
              <STableRow key={row.contractAddress}>
                <RowText component='th' scope='row'>
                  <STooltip text='Edit alias'>{row.alias}</STooltip>
                </RowText>

                <RowText align='left'>
                  <STooltip text={row.contractAddress}>{row.contractAddress}</STooltip>
                </RowText>

                <RowText align='left'>{row.enabledCallers}</RowText>

                <RowText align='right'>
                  <OptionsMenu type='relay' value={row.contractAddress} />
                </RowText>
              </STableRow>
            ))}
          </TableBody>
        </STable>
      </TableContainer>
    </SCard>
  );
};

const SColumnTitle = styled(ColumnTitle)({
  width: '28rem',
});
