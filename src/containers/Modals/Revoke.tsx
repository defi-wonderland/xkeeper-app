import { styled, Box } from '@mui/material';
import { Address, useContractWrite, usePrepareContractWrite, usePublicClient } from 'wagmi';

import { StyledTitle, StyledText, CancelButton, RevokeButton, BaseModal } from '~/components';
import { useStateContext } from '~/hooks';
import { truncateAddress } from '~/utils';
import { vaultABI } from '~/generated';
import { ModalType } from '~/types';

export const RevokeModal = () => {
  const { setNotificationOpen, setModalOpen, modalOpen, selectedItem, selectedVault, loading, setLoading } =
    useStateContext();
  const publicClient = usePublicClient();

  const type = selectedItem.type;
  const value = selectedItem.address;
  const functionName = selectedItem?.type === 'relay' ? 'revokeRelayCallers' : 'revokeJobFunctions';

  const { config } = usePrepareContractWrite({
    address: selectedVault?.address,
    abi: vaultABI,
    functionName: functionName,
    args: [selectedItem.address, selectedItem.params] as [Address, Address[]],
  });

  const { writeAsync } = useContractWrite(config);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      // temporary log
      console.log(`revoking ${type} ${value}`);
      if (writeAsync) {
        const writeResult = await writeAsync();
        await publicClient.waitForTransactionReceipt(writeResult);
        setModalOpen(ModalType.NONE);
        setNotificationOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <BaseModal open={modalOpen === ModalType.REVOQUE}>
      <SBox>
        <StyledTitle>Revoke {type}</StyledTitle>

        <StyledText>
          Are you sure you want to revoke <span>{truncateAddress(value)}</span>? This action cannot be undone.
        </StyledText>
      </SBox>

      <ButtonsContainer>
        <CancelButton variant='outlined' disabled={loading} onClick={() => setModalOpen(ModalType.NONE)}>
          Cancel
        </CancelButton>

        <RevokeButton variant='contained' disabled={!writeAsync || loading} onClick={handleConfirm}>
          {!loading && `Revoke ${type}`}
          {loading && `Loading...`}
        </RevokeButton>
      </ButtonsContainer>
    </BaseModal>
  );
};

export const SBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  marginBottom: '2.4rem',
  width: '40rem',
});

export const ButtonsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.2rem',
  button: {
    width: '100%',
  },
});
