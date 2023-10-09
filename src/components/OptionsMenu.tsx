import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import { styled } from '@mui/system';
import { Address } from 'viem';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useStateContext } from '~/hooks';
import { ModalType } from '~/types';

export interface OptionsMenuProps {
  address: string;
  params: Address[] | string[];
  type: 'vault' | 'job' | 'relay';
}

export function OptionsMenu({ type, address, params }: OptionsMenuProps) {
  const { setModalOpen, userAddress, selectedVault, setSelectedItem } = useStateContext();

  const handleOpenEditModal = () => setModalOpen(ModalType.EDIT_ALIAS);

  const handleOpenRevokeModal = () => {
    setSelectedItem({ type, address, params });
    setModalOpen(ModalType.REVOQUE);
  };

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

        {userAddress && selectedVault?.owner === userAddress && (
          <StyledMenuItem onClick={handleOpenRevokeModal}>
            <RevokeContainer>
              <HighlightOffIcon />
              <p>Revoke {type}</p>
            </RevokeContainer>
          </StyledMenuItem>
        )}
      </Menu>
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
    boxShadow: ' 0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
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
    color: currentTheme.error,
  };
});
