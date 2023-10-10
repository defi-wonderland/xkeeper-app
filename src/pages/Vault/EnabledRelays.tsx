import { useEffect, useMemo, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import { Address } from 'viem';

import { SectionHeader, SCard, Title, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, OptionsMenu, ActiveButton, IconContainer, Icon } from '~/components';
import { copyData, truncateAddress } from '~/utils';
import { Items, ModalType } from '~/types';
import { useStateContext } from '~/hooks';
import { Text } from './EnabledJobs';

function createRelaysData(alias: string, contractAddress: string, enabledCallers: Address[]) {
  return { alias, contractAddress, enabledCallers };
}

export const EnabledRelays = () => {
  const { userAddress, setModalOpen, selectedVault, currentTheme } = useStateContext();

  const selectedRelays = useMemo(() => selectedVault?.relays || {}, [selectedVault]);

  const relays = useMemo(
    () => Object.keys(selectedRelays).map((key) => createRelaysData('Test', key, selectedRelays[key])),
    [selectedRelays],
  );

  const [items, setItems] = useState<Items[]>([{ value: '', itemCopied: false }]);

  useEffect(() => {
    if (relays.length > 0) setItems(relays?.map((relays) => ({ value: relays.contractAddress, itemCopied: false })));
  }, [relays]);

  const handleCopy = async (content: string, index: number) => {
    copyData(content);
    const newItems = [...items];
    newItems[index].itemCopied = true;
    setItems(newItems);

    setTimeout(() => {
      const newItems = [...items];
      newItems[index].itemCopied = false;
      setItems(newItems);
    }, 800);
  };

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
              {relays.map((row, index) => (
                <STableRow key={row.contractAddress}>
                  {/* Alias */}
                  <RowText component='th' scope='row'>
                    <STooltip text='Edit alias'>
                      <Text>{row.alias}</Text>
                    </STooltip>
                  </RowText>

                  {/* Contract Address */}
                  <RowText align='left'>
                    <AddressContainer>
                      <STooltip text={row.contractAddress} address>
                        <Text>{truncateAddress(row.contractAddress)}</Text>
                      </STooltip>

                      <STooltip text={'Copied!'} open={!!items[index]?.itemCopied}>
                        <IconContainer onClick={() => handleCopy(row.contractAddress, index)}>
                          <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />
                        </IconContainer>
                      </STooltip>
                    </AddressContainer>
                  </RowText>

                  {/* Enabled Callers */}
                  <RowText align='left'>
                    {row.enabledCallers?.map((caller) => (
                      <AddressContainer key={caller}>
                        <STooltip text={caller} address>
                          <Text>{truncateAddress(caller)}</Text>
                        </STooltip>

                        <STooltip text={'Copied!'} open={!!items[index]?.itemCopied}>
                          <IconContainer onClick={() => handleCopy(row.contractAddress, index)}>
                            <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />
                          </IconContainer>
                        </STooltip>
                      </AddressContainer>
                    ))}
                  </RowText>

                  {/* Options Menu */}
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

export const AddressContainer = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.8rem',
    width: '100%',
  };
});
