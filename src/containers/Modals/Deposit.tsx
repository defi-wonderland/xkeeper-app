import { BaseModal, ModalTitle } from '~/components';

interface DepositModalProps {
  children: React.ReactNode;
}

export const DepositModal = ({ children }: DepositModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <ModalTitle>Deposit Modal</ModalTitle>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
