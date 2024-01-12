import { useEffect, useState } from 'react';
import { TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';

import { Items, JobsData, ModalType, OptionsType, SelectedItem } from '~/types';
import { Icon, IconContainer, STooltip } from '~/components';
import { useAlias, useModal, useStateContext, useTheme } from '~/hooks';
import { ColumnTitle, RowText, STable, STableRow } from '../Tokens';
import { copyData, truncateAddress } from '~/utils';
import { NoDataContainer } from '~/containers';

interface JobsTableProps {
  jobsData: JobsData;
}

export const JobsTable = ({ jobsData }: JobsTableProps) => {
  const { currentTheme } = useTheme();
  const { setSelectedItem } = useStateContext();
  const { aliasData } = useAlias();
  const { setModalOpen } = useModal();

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

  const handleOpenAliasModal = (type: OptionsType, address: string, params: string[]) => {
    const selectedItem = { type, jobAddress: address, params } as SelectedItem;
    setSelectedItem(selectedItem);
    setModalOpen(ModalType.EDIT_ALIAS);
  };

  useEffect(() => {
    if (jobsData.length > 0) setItems(jobsData?.map(({ job }) => ({ value: job, itemCopied: false })));
  }, [jobsData]);
  return (
    <>
      {!!jobsData.length && (
        <TableContainer>
          <STable>
            <TableHead>
              <TableRow>
                <SColumnTitle>Enabled Jobs</SColumnTitle>
                <ColumnTitle align='left'>Job Address</ColumnTitle>
                <ColumnTitle align='left'>Function Selectors</ColumnTitle>
              </TableRow>
            </TableHead>

            <TableBody>
              {jobsData.map(({ job: jobAddress, functionSelectors }, index) => (
                <STableRow key={jobAddress + index}>
                  {/* Alias */}
                  <RowText component='th' scope='row'>
                    <STooltip text='Edit alias'>
                      <Text
                        onClick={() => handleOpenAliasModal('job', jobAddress, functionSelectors)}
                        data-test={`job-alias-${index}`}
                      >
                        {aliasData[jobAddress] || `Job ${index + 1}`}
                      </Text>
                    </STooltip>
                  </RowText>

                  {/* Job Address */}
                  <RowText align='left'>
                    <AddressContainer onClick={() => handleCopy(jobAddress, index)}>
                      <STooltip text={jobAddress} address>
                        <Text>{truncateAddress(jobAddress)}</Text>
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
                    {functionSelectors?.map((selector) => (
                      <STooltip text={selector} address key={selector}>
                        <Text>{selector}</Text>
                      </STooltip>
                    ))}
                  </RowText>
                </STableRow>
              ))}
            </TableBody>
          </STable>
        </TableContainer>
      )}

      {!jobsData.length && <NoDataContainer dataTest='no-jobs-enabled' text='No jobs enabled.' />}
    </>
  );
};

const SColumnTitle = styled(ColumnTitle)({
  minWidth: '28rem',
});

const Text = styled('p')({
  display: 'block',
  margin: '0.2rem 0',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '20rem',
  cursor: 'pointer',
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
