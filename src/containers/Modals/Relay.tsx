import { BaseModal, ModalTitle } from '~/components';

interface RelayModalProps {
  children: React.ReactNode;
}

export const RelayModal = ({ children }: RelayModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <ModalTitle>Relay Modal</ModalTitle>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
