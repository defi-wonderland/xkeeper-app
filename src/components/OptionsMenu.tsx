import { useState } from 'react';
import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import { styled } from '@mui/system';
import { Button } from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useStateContext } from '~/hooks';
import { StyledModal, StyledBackdrop } from './BaseModal';
import { EditAliasModal, RevokeModal } from '~/containers';

export interface OptionsMenuProps {
  value: string;
  type: 'vault' | 'job' | 'relay';
}

export function OptionsMenu({ type, value }: OptionsMenuProps) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const [openRevokeModal, setOpenRevokeModal] = useState(false);
  const handleOpenRevokeModal = () => setOpenRevokeModal(true);
  const handleCloseRevokeModal = () => setOpenRevokeModal(false);

  return (
    <Dropdown>
      {/* Dropdown button */}
      <TriggerButton>
        {/* TODO: use correct icons */}
        <MoreVertIcon />
      </TriggerButton>

      {/* Dropdown Options */}
      <Menu slots={{ listbox: StyledListbox }}>
        <StyledMenuItem onClick={handleOpenEditModal}>
          <EditContainer>
            <CreateIcon />
            <p>Edit {type}</p>
          </EditContainer>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleOpenRevokeModal}>
          <RevokeContainer>
            <HighlightOffIcon />
            <p>Revoke {type}</p>
          </RevokeContainer>
        </StyledMenuItem>
      </Menu>

      <StyledModal open={openEditModal} onClose={handleCloseEditModal} slots={{ backdrop: StyledBackdrop }}>
        <EditAliasModal type={type} value={value} close={handleCloseEditModal} />
      </StyledModal>

      <StyledModal open={openRevokeModal} onClose={handleCloseRevokeModal} slots={{ backdrop: StyledBackdrop }}>
        <RevokeModal type={type} value={value} close={handleCloseRevokeModal} />
      </StyledModal>
    </Dropdown>
  );
}

const StyledListbox = styled('ul')(() => {
  const { currentTheme } = useStateContext();
  return {
    border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    color: currentTheme.textSecondary,
    background: currentTheme.backgroundPrimary,
    padding: '0.4rem 0',
    width: '16.4rem',
    fontSize: '1.4rem',
    boxSizing: 'border-box',
    margin: '12px 0',
    borderRadius: '12px',
    overflow: 'auto',
    outline: '0px',
  };
});

const StyledMenuItem = styled(MenuItem)({
  padding: '0',
  margin: '0',
});

const TriggerButton = styled(MenuButton)(() => {
  const { currentTheme } = useStateContext();
  return {
    border: 'none',
    borderRadius: currentTheme.borderRadius,
    fontsize: '1.6rem',
    textAlign: 'start',
    backgroundColor: 'inherit',
    height: '4.3rem',
    cursor: 'pointer',
    '&:hover': {
      border: 'none',
      outline: 'none',
    },
  };
});

const OptionContainer = styled('div')(() => {
  const { currentTheme } = useStateContext();
  return {
    background: currentTheme.backgroundPrimary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.8rem',
    cursor: 'pointer',
    height: 'auto',
    padding: '1rem 1.6rem',
    p: {
      fontSize: '1.4rem',
      lineHeight: '2.4rem',
      fontWeight: '500',
      margin: '0',
      textTransform: 'capitalize',
    },
  };
});

const EditContainer = styled(OptionContainer)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textPrimary,
  };
});

const RevokeContainer = styled(OptionContainer)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.red,
  };
});

export const CancelButton = styled(Button)(() => {
  const {
    currentTheme: { borderRadius, textSecondaryDisabled },
  } = useStateContext();
  return {
    color: 'inherit',
    borderColor: textSecondaryDisabled,
    borderRadius: borderRadius,
    fontSize: '1.4rem',
    textTransform: 'none',
    padding: '1rem 1.6rem',
    boxShadow: 'none',
    width: '100%',
    '&:hover': {
      borderColor: textSecondaryDisabled,
    },
  };
});

export const ActiveButton = styled(Button)(() => {
  const {
    currentTheme: { borderRadius, actionButton },
  } = useStateContext();
  return {
    borderRadius: borderRadius,
    backgroundColor: actionButton,
    textTransform: 'capitalize',
    fontSize: '1.4rem',
    padding: '1rem 1.6rem',
    boxShadow: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: actionButton,
    },
  };
});

export const RevokeButton = styled(ActiveButton)(() => {
  const { currentTheme } = useStateContext();
  return {
    backgroundColor: currentTheme.red,
    '&:hover': {
      backgroundColor: currentTheme.red,
    },
  };
});
