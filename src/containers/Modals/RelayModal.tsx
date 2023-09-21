import { BaseModal } from '~/components';

interface RelayModalProps {
  children: React.ReactNode;
}

export const RelayModal = ({ children }: RelayModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <h2>Relay Modal</h2>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
