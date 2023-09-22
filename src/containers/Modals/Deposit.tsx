import { BaseModal, StyledTitle } from '~/components';

interface DepositModalProps {
  children: React.ReactNode;
}

export const DepositModal = ({ children }: DepositModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <StyledTitle>Deposit Modal</StyledTitle>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
