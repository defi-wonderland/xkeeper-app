import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import { styled } from '@mui/system';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useStateContext } from '~/hooks';
import { Backdrop, StyledModal } from './BaseModal';
import { EditAliasModal, RevokeModal } from '~/containers';
import { ModalType } from '~/types';
import { zIndex } from '~/utils';

export interface OptionsMenuProps {
  value: string;
  type: 'vault' | 'job' | 'relay';
}

export function OptionsMenu({ type, value }: OptionsMenuProps) {
  const { modalOpen, setModalOpen, userAddress } = useStateContext();

  const handleOpenEditModal = () => setModalOpen(ModalType.EDIT_ALIAS);
  const handleOpenRevokeModal = () => setModalOpen(ModalType.REVOQUE);
  const handleClose = () => setModalOpen(ModalType.NONE);

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

        {/* TODO: add isOwner condition */}
        {userAddress && (
          <StyledMenuItem onClick={handleOpenRevokeModal}>
            <RevokeContainer>
              <HighlightOffIcon />
              <p>Revoke {type}</p>
            </RevokeContainer>
          </StyledMenuItem>
        )}
      </Menu>

      <StyledModal open={modalOpen === ModalType.EDIT_ALIAS} onClose={handleClose} slots={{ backdrop: StyledBackdrop }}>
        <EditAliasModal type={type} value={value} />
      </StyledModal>

      <StyledModal open={modalOpen === ModalType.REVOQUE} onClose={handleClose} slots={{ backdrop: StyledBackdrop }}>
        <RevokeModal type={type} value={value} />
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

const StyledBackdrop = styled(Backdrop)`
  z-index: ${zIndex.BACKDROP};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: transparent;
`;
