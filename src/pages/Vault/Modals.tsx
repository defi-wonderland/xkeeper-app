import { AddMetadataModal, DepositModal, EditAliasModal, RelayModal, RevokeModal, WithdrawtModal } from '~/containers';

export const Modals = () => {
  return (
    <>
      <DepositModal />
      <RelayModal />
      <WithdrawtModal />
      <EditAliasModal />
      <RevokeModal />
      <AddMetadataModal />
    </>
  );
};
