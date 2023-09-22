import { BaseModal, StyledTitle } from '~/components';

interface RelayModalProps {
  children: React.ReactNode;
}

export const RelayModal = ({ children }: RelayModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <StyledTitle>Relay Modal</StyledTitle>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
