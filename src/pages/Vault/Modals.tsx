import {
  AddMetadataModal,
  DepositModal,
  EditAliasModal,
  JobModal,
  RelayModal,
  RevokeModal,
  WithdrawtModal,
} from '~/containers';

export const Modals = () => {
  return (
    <>
      <DepositModal />
      <JobModal />
      <RelayModal />
      <WithdrawtModal />
      <EditAliasModal />
      <RevokeModal />
      <AddMetadataModal />
    </>
  );
};
