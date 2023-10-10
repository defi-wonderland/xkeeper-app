import * as React from 'react';
import clsx from 'clsx';
import { styled, Box } from '@mui/system';
import { Modal } from '@mui/base/Modal';

import { useStateContext } from '~/hooks';
import { zIndex } from '~/utils';
import { ModalType } from '~/types';
import { CustomScrollbar } from '~/components';

interface BaseModalProps {
  children: React.ReactNode;
  open: boolean;
}

export const BaseModal = ({ children, open }: BaseModalProps) => {
  const { setModalOpen } = useStateContext();
  return (
    <StyledModal open={open} onClose={() => setModalOpen(ModalType.NONE)} slots={{ backdrop: StyledBackdrop }}>
      <SModal>
        <SCustomScrollbar>{children}</SCustomScrollbar>
      </SModal>
    </StyledModal>
  );
};

// eslint-disable-next-line react/display-name
export const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
});

export const StyledModal = styled(Modal)`
  position: fixed;
  z-index: ${zIndex.MODAL};
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: none;
`;

export const StyledBackdrop = styled(Backdrop)`
  z-index: ${zIndex.BACKDROP};
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export const SModal = styled(Box)(() => {
  const { currentTheme } = useStateContext();

  return {
    backgroundColor: currentTheme.backgroundPrimary,
    minWidth: '40rem',
    borderRadius: '1.2rem',
    padding: '0.6rem',
    boxShadow: 'none',
  };
});

const SCustomScrollbar = styled(CustomScrollbar)(() => {
  return {
    overflowX: 'hidden',
    maxHeight: '75vh',
    padding: '1.8rem',
  };
});
