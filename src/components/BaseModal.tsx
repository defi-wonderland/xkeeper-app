import * as React from 'react';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import { Button } from '@mui/material';

import { useStateContext } from '~/hooks';

interface BaseModalProps {
  triggerButton: React.ReactNode;
  children: React.ReactNode;
}

export const BaseModal = ({ triggerButton, children }: BaseModalProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <TriggerButton type='button' onClick={handleOpen}>
        {triggerButton}
      </TriggerButton>
      <StyledModal open={open} onClose={handleClose} slots={{ backdrop: StyledBackdrop }}>
        <SBox>{children}</SBox>
      </StyledModal>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const SBox = styled(Box)(() => {
  const {
    currentTheme: { backgroundPrimary },
  } = useStateContext();

  return {
    width: 400,
    borderRadius: '12px',
    padding: '16px 32px 24px 32px',
    backgroundColor: backgroundPrimary,
    boxShadow: '0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)',
  };
});

const TriggerButton = styled(Button)({
  padding: '0',
});
