import { useEffect, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { Icon, IconContainer, OptionsMenu, STooltip } from '~/components';
import { ColumnTitle, RowText, STable, STableRow } from '~/pages/Vault/Tokens';
import { copyData } from '~/utils';
import { NoDataContainer } from '~/containers';
import { useTheme } from '~/hooks';
import { Items } from '~/types';

interface CallersProps {
  relayAddress: string;
  callers: string[];
}
export const CallersTable = ({ relayAddress, callers }: CallersProps) => {
  const { currentTheme } = useTheme();

  const [items, setItems] = useState<Items[]>([{ value: '', itemCopied: false }]);

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

  useEffect(() => {
    if (callers.length > 0) setItems(callers?.map((callers) => ({ value: callers, itemCopied: false })));
  }, [callers]);

  return (
    <>
      {!!callers.length && (
        <TableContainer>
          <STable>
            <TableHead>
              <TableRow>
                <ColumnTitle>Enabled Callers</ColumnTitle>
                <ColumnTitle align='right'></ColumnTitle>
              </TableRow>
            </TableHead>

            <TableBody>
              {callers.map((callerAddress, index) => (
                <STableRow key={callerAddress + index}>
                  {/* Caller Address */}
                  <RowText align='left'>
                    <AddressContainer onClick={() => handleCopy(callerAddress, index)}>
                      <STooltip text={callerAddress} address>
                        <Text>{callerAddress}</Text>
                      </STooltip>

                      <STooltip text={items[index]?.itemCopied ? 'Copied!' : 'Copy Address'}>
                        <IconContainer>
                          {!items[index]?.itemCopied && (
                            <Icon name='copy' color={currentTheme.textDisabled} size='1.7rem' />
                          )}
                          {!!items[index]?.itemCopied && (
                            <Icon name='check' color={currentTheme.textDisabled} size='1.7rem' />
                          )}
                        </IconContainer>
                      </STooltip>
                    </AddressContainer>
                  </RowText>

                  {/* Options Menu */}
                  <RowButton align='right' data-test={`job-options-${index}`}>
                    <OptionsMenu type='caller' relayAddress={relayAddress} jobAddress={'0x'} params={[callerAddress]} />
                  </RowButton>
                </STableRow>
              ))}
            </TableBody>
          </STable>
        </TableContainer>
      )}

      {!callers.length && <NoDataContainer dataTest='no-jobs-enabled' text='No callers enabled.' />}
    </>
  );
};

const RowButton = styled(RowText)(() => {
  const { currentTheme } = useTheme();
  return {
    padding: '0rem',
    minWidth: '8rem',
    width: '8.5rem',
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

const Text = styled('p')({
  display: 'block',
  margin: '0.2rem 0',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const AddressContainer = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.8rem',
    width: '100%',
    cursor: 'pointer',
  };
});
