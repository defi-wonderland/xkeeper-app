import { BaseModal, StyledTitle } from '~/components';

interface WithdrawModalProps {
  children: React.ReactNode;
}

export const WithdrawtModal = ({ children }: WithdrawModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <StyledTitle>Withdraw Modal</StyledTitle>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
