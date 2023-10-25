import { useEffect, useMemo, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import { Address } from 'viem';

import { SectionHeader, SCard, Title, ColumnTitle, RowText, STableRow, STable } from './Tokens';
import { STooltip, OptionsMenu, ActiveButton, IconContainer, Icon, StyledText } from '~/components';
import { copyData, truncateAddress } from '~/utils';
import { ModalType, OptionsType, SelectedItem } from '~/types';
import { useStateContext } from '~/hooks';
import { Text } from './EnabledJobs';

function createRelaysData(alias: string, contractAddress: string, enabledCallers: Address[]) {
  return { alias, contractAddress, enabledCallers };
}

export const EnabledRelays = () => {
  const { setModalOpen, setSelectedItem, userAddress, selectedVault, currentTheme, aliasData } = useStateContext();
  const [items, setItems] = useState<{ [key: string]: boolean }>({});
  const selectedRelays = useMemo(() => selectedVault?.relays || {}, [selectedVault]);

  const relays = useMemo(
    () =>
      Object.keys(selectedRelays).map((key, index) => createRelaysData(`Relay ${index + 1}`, key, selectedRelays[key])),
    [selectedRelays],
  );

  const flattenRelays = useMemo(() => {
    const realysAddress = relays.map((relay) => relay.contractAddress);
    const callers = relays.map((relay) => relay.enabledCallers.map((caller) => `${relay.contractAddress}${caller}`));
    return [...realysAddress, ...callers.flat()];
  }, [relays]);

  useEffect(() => {
    if (flattenRelays.length > 0) setItems(Object.fromEntries(flattenRelays.map((address) => [address, false])));
  }, [flattenRelays]);

  const handleCopy = async (relayAddress: string, callerAddress: string) => {
    const key = relayAddress + callerAddress;
    copyData(callerAddress || relayAddress);
    const newItems = { ...items };
    newItems[key] = true;
    setItems(newItems);

    setTimeout(() => {
      const newItems = { ...items };
      newItems[key] = false;
      setItems(newItems);
    }, 800);
  };

  const handleOpenAliasModal = (type: OptionsType, address: string, params: string[]) => {
    const selectedItem = { type, address, params } as SelectedItem;
    setSelectedItem(selectedItem);
    setModalOpen(ModalType.EDIT_ALIAS);
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
                <ColumnTitle align='left'>Relay Address</ColumnTitle>
                <ColumnTitle align='left'>Enabled Callers</ColumnTitle>
                <ColumnTitle align='left'></ColumnTitle>
              </TableRow>
            </TableHead>

            <TableBody>
              {relays.map((row) => (
                <STableRow key={row.contractAddress}>
                  {/* Alias */}
                  <RowText component='th' scope='row'>
                    <STooltip text='Edit alias'>
                      <SText onClick={() => handleOpenAliasModal('relay', row.contractAddress, row.enabledCallers)}>
                        {aliasData[row.contractAddress] || row.alias}
                      </SText>
                    </STooltip>
                  </RowText>

                  {/* Contract Address */}
                  <RowText align='left'>
                    <AddressContainer onClick={() => handleCopy(row.contractAddress, '')}>
                      <STooltip text={row.contractAddress} address>
                        <Text>{truncateAddress(row.contractAddress)}</Text>
                      </STooltip>

                      <STooltip text={items[row.contractAddress] ? 'Copied!' : 'Copy Address'}>
                        <IconContainer>
                          {!items[row.contractAddress] && (
                            <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />
                          )}
                          {!!items[row.contractAddress] && (
                            <Icon name='check' color={currentTheme.textDisabled} size='1.7rem' />
                          )}
                        </IconContainer>
                      </STooltip>
                    </AddressContainer>
                  </RowText>

                  {/* Enabled Callers */}
                  <RowText align='left'>
                    {row.enabledCallers?.map((caller) => (
                      <AddressContainer key={caller} onClick={() => handleCopy(row.contractAddress, caller)}>
                        <STooltip text={caller} address>
                          <Text>{truncateAddress(caller)}</Text>
                        </STooltip>

                        <STooltip text={items[row.contractAddress + caller] ? 'Copied!' : 'Copy Address'}>
                          <IconContainer>
                            {!items[row.contractAddress + caller] && (
                              <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />
                            )}
                            {!!items[row.contractAddress + caller] && (
                              <Icon name='check' color={currentTheme.textDisabled} size='1.7rem' />
                            )}
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

      {!relays.length && (
        <NoDataContainer>
          <StyledText>No relays enabled.</StyledText>
        </NoDataContainer>
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
      transition: currentTheme.basicTransition,
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
    cursor: 'pointer',
  };
});

export const SText = styled(Text)(() => {
  return { cursor: 'pointer' };
});

export const NoDataContainer = styled('div')(() => {
  const { currentTheme } = useStateContext();
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: '2.4rem',
    p: {
      color: currentTheme.textDisabled,
    },
  };
});
