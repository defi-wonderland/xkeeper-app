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
        <SModal>{children}</SModal>
      </StyledModal>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

export const StyledModal = styled(Modal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const SModal = styled(Box)(() => {
  const {
    currentTheme: { backgroundPrimary },
  } = useStateContext();

  return {
    width: '40rem',
    borderRadius: '1.2rem',
    padding: '2.4rem',
    backgroundColor: backgroundPrimary,
    boxShadow: '0 0.8rem 0.8rem -0.4rem rgba(16, 24, 40, 0.03), 0 2rem 2.4rem -0.4rem rgba(16, 24, 40, 0.08)',
  };
});

const TriggerButton = styled(Button)({
  padding: '0',
});

export const ModalTitle = styled('h1')(() => {
  const { currentTheme } = useStateContext();
  return {
    textTransform: 'capitalize',
    fontSize: '2rem',
    lineHeight: '2.8rem',
    margin: 0,
    padding: 0,
    fontWeight: 'bold',
    color: currentTheme.textPrimary,
  };
});

export const ModalText = styled('p')(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.4rem',
    lineHeight: '2rem',
    margin: 0,
    padding: 0,
    fontWeight: 400,
    color: currentTheme.textTertiary,
    span: {
      fontWeight: 500,
    },
  };
});
