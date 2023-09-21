import { BaseModal, ModalTitle } from '~/components';

interface WithdrawModalProps {
  children: React.ReactNode;
}

export const WithdrawtModal = ({ children }: WithdrawModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <ModalTitle>Withdraw Modal</ModalTitle>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
