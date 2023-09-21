import { BaseModal } from '~/components';

interface JobModalProps {
  children: React.ReactNode;
}

export const JobModal = ({ children }: JobModalProps) => {
  return (
    <div>
      <BaseModal triggerButton={children}>
        <h2>Job Modal</h2>
        <p>Aliquid amet deserunt earum!</p>
      </BaseModal>
    </div>
  );
};
