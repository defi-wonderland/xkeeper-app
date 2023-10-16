import { useEffect, useMemo, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { ColumnTitle, SCard, SectionHeader, Title, RowText, STableRow, STable } from './Tokens';
import { AddressContainer, RowButton, SText } from './EnabledRelays';
import { ActiveButton, OptionsMenu, IconContainer, STooltip, Icon } from '~/components';
import { copyData, truncateAddress } from '~/utils';
import { Items, ModalType, OptionsType, SelectedItem } from '~/types';
import { useStateContext } from '~/hooks';

function createJobsData(alias: string, contractAddress: string, functionSignature: string[]) {
  return { alias, contractAddress, functionSignature };
}

export const EnabledJobs = () => {
  const { userAddress, setSelectedItem, setModalOpen, selectedVault, currentTheme, aliasData } = useStateContext();
  const [items, setItems] = useState<Items[]>([{ value: '', itemCopied: false }]);

  const selectedJobs = useMemo(() => selectedVault?.jobs || {}, [selectedVault?.jobs]);

  const jobs = useMemo(
    () => Object.keys(selectedJobs).map((key, index) => createJobsData(`Job ${index + 1}`, key, selectedJobs[key])),
    [selectedJobs],
  );

  useEffect(() => {
    if (jobs.length > 0) setItems(jobs?.map((jobs) => ({ value: jobs.contractAddress, itemCopied: false })));
  }, [jobs]);

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

  const handleOpenAliasModal = (type: OptionsType, address: string, params: string[]) => {
    const selectedItem = { type, address, params } as SelectedItem;
    setSelectedItem(selectedItem);
    setModalOpen(ModalType.EDIT_ALIAS);
  };

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Enabled Jobs</Title>

        {selectedVault?.owner === userAddress && (
          <ActiveButton variant='contained' disabled={!userAddress} onClick={() => setModalOpen(ModalType.ADD_JOB)}>
            Add New Job
          </ActiveButton>
        )}
      </SectionHeader>

      {!!jobs.length && (
        <TableContainer>
          <STable aria-label='simple table'>
            <TableHead>
              <TableRow>
                <SColumnTitle>Alias</SColumnTitle>
                <ColumnTitle align='left'>ContractAddress</ColumnTitle>
                <ColumnTitle align='left'>Function Signature</ColumnTitle>
                <ColumnTitle align='right'></ColumnTitle>
              </TableRow>
            </TableHead>

            <TableBody>
              {jobs.map((row, index) => (
                <STableRow key={row.contractAddress}>
                  {/* Alias */}
                  <RowText component='th' scope='row'>
                    <STooltip text='Edit alias'>
                      <SText onClick={() => handleOpenAliasModal('job', row.contractAddress, row.functionSignature)}>
                        {aliasData[row.contractAddress] || row.alias}
                      </SText>
                    </STooltip>
                  </RowText>

                  {/* Contract Address */}
                  <RowText align='left'>
                    <AddressContainer onClick={() => handleCopy(row.contractAddress, index)}>
                      <STooltip text={row.contractAddress} address>
                        <Text>{truncateAddress(row.contractAddress)}</Text>
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

                  {/* Function Signature */}
                  <RowText align='left'>
                    {row.functionSignature?.map((signature) => (
                      <STooltip text={signature} address key={signature}>
                        <Text>{signature}</Text>
                      </STooltip>
                    ))}
                  </RowText>

                  {/* Options Menu */}
                  <RowButton align='right'>
                    <OptionsMenu type='job' address={row.contractAddress} params={row.functionSignature} />
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

export const Text = styled('p')({
  display: 'block',
  margin: '0.2rem 0',
  width: 'fit-content',
});
