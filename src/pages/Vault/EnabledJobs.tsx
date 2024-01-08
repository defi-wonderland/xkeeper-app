import { useEffect, useMemo, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { ColumnTitle, SCard, SectionHeader, Title, RowText, STableRow, STable } from './Tokens';
import { AddressContainer, NoDataContainer, RowButton, SText } from './EnabledRelays';
import { OptionsMenu, IconContainer, STooltip, Icon, StyledText } from '~/components';
import { aliasKey, copyData, saveLocalStorage, truncateAddress } from '~/utils';
import { Items, ModalType, OptionsType, SelectedItem } from '~/types';
import { useAlias, useModal, useStateContext, useTheme } from '~/hooks';

function createJobsData(alias: string, relayAddress: string, jobAddress: string, functionSignature: string[]) {
  return { alias, relayAddress, jobAddress, functionSignature };
}

export const EnabledJobs = () => {
  const { currentTheme } = useTheme();
  const { setSelectedItem, selectedVault } = useStateContext();
  const { aliasData, updateAliasData } = useAlias();
  const { setModalOpen } = useModal();

  const [items, setItems] = useState<Items[]>([{ value: '', itemCopied: false }]);

  const selectedJobs = useMemo(() => selectedVault?.relays || {}, [selectedVault?.relays]);

  const jobs = useMemo(() => {
    const jobsList = Object.entries(selectedJobs).map(([key, values], relayIndex) => {
      return values.jobsData.map((jobData, jobIndex) => {
        const customAlias = `Job ${relayIndex + jobIndex + 1}`;

        // If the job doesn't have an alias, add a customAlias
        if (!aliasData[jobData.job]) {
          const newAliasData = { ...aliasData, [jobData.job]: customAlias };
          saveLocalStorage(aliasKey, newAliasData);
          updateAliasData();
        }

        return createJobsData(customAlias, key, jobData.job, jobData.functionSelectors);
      });
    });
    return jobsList.flat();
  }, [aliasData, selectedJobs, updateAliasData]);

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
    const selectedItem = { type, jobAddress: address, params } as SelectedItem;
    setSelectedItem(selectedItem);
    setModalOpen(ModalType.EDIT_ALIAS);
  };

  useEffect(() => {
    if (jobs.length > 0) setItems(jobs?.map((jobs) => ({ value: jobs.jobAddress, itemCopied: false })));
  }, [jobs]);

  return (
    <SCard variant='outlined'>
      <SectionHeader>
        <Title>Enabled Jobs</Title>
      </SectionHeader>

      {!!jobs.length && (
        <TableContainer>
          <STable aria-label='simple table'>
            <TableHead>
              <TableRow>
                <SColumnTitle>Alias</SColumnTitle>
                <ColumnTitle align='left'>Relay</ColumnTitle>
                <ColumnTitle align='left'>Job Address</ColumnTitle>
                <ColumnTitle align='left'>Function Signature</ColumnTitle>
                <ColumnTitle align='right'></ColumnTitle>
              </TableRow>
            </TableHead>

            <TableBody>
              {jobs.map((row, index) => (
                <STableRow key={row.relayAddress + index}>
                  {/* Alias */}
                  <RowText component='th' scope='row'>
                    <STooltip text='Edit alias'>
                      <SText
                        onClick={() => handleOpenAliasModal('job', row.jobAddress, row.functionSignature)}
                        data-test={`job-alias-${index}`}
                      >
                        {aliasData[row.jobAddress] || row.alias}
                      </SText>
                    </STooltip>
                  </RowText>

                  {/* Relay Address */}
                  <RowText align='left'>
                    <AddressContainer onClick={() => handleOpenAliasModal('relay', row.relayAddress, [])}>
                      <STooltip text={row.relayAddress} address>
                        <Text> {aliasData[row.relayAddress] || row.alias}</Text>
                      </STooltip>
                    </AddressContainer>
                  </RowText>

                  {/* Job Address */}
                  <RowText align='left'>
                    <AddressContainer onClick={() => handleCopy(row.jobAddress, index)}>
                      <STooltip text={row.jobAddress} address>
                        <Text>{truncateAddress(row.jobAddress)}</Text>
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
                  <RowButton align='right' data-test={`job-options-${index}`}>
                    <OptionsMenu
                      type='job'
                      relayAddress={row.relayAddress}
                      jobAddress={row.jobAddress}
                      params={row.functionSignature}
                    />
                  </RowButton>
                </STableRow>
              ))}
            </TableBody>
          </STable>
        </TableContainer>
      )}

      {!jobs.length && (
        <NoDataContainer>
          <StyledText data-test='no-jobs-enabled'>No jobs enabled.</StyledText>
        </NoDataContainer>
      )}
    </SCard>
  );
};

const SColumnTitle = styled(ColumnTitle)({
  minWidth: '12rem',
});

export const Text = styled('p')({
  display: 'block',
  margin: '0.2rem 0',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '20rem',
});
