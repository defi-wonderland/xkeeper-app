import { BaseModal } from '~/components';

interface DepositModalProps {
  children: React.ReactNode;
}

export const DepositModal = ({ children }: DepositModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <h2>Deposit Modal</h2>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
