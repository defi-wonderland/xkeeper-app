import { BaseModal } from '~/components';

interface WithdrawModalProps {
  children: React.ReactNode;
}

export const WithdrawtModal = ({ children }: WithdrawModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <h2>Withdraw Modal</h2>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
