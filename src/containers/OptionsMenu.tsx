import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/base';
import { styled } from '@mui/system';

import { useModal, useStateContext, useTheme } from '~/hooks';
import { ModalType } from '~/types';
import { Icon } from '../components/Icon';

export interface OptionsMenuProps {
  relayAddress: string;
}

export function OptionsMenu({ relayAddress }: OptionsMenuProps) {
  const { setSelectedItem } = useStateContext();
  const { setModalOpen } = useModal();
  const { currentTheme } = useTheme();

  const handleOpenEditModalAlias = () => {
    setSelectedItem({ selectedAddress: relayAddress });
    setModalOpen(ModalType.ADD_RELAY);
  };

  const handleOpenRevokeModal = () => {
    setSelectedItem({ selectedAddress: relayAddress });
    setModalOpen(ModalType.REVOQUE);
  };

  return (
    <Dropdown>
      {/* Dropdown button */}
      <TriggerButton>
        <Icon name='menu' color={currentTheme.textDisabled} size='2rem' />
      </TriggerButton>

      {/* Dropdown Options */}

      <Menu slots={{ listbox: StyledListbox }}>
        <>
          <StyledMenuItem onClick={handleOpenEditModalAlias} data-test='edit-options-button'>
            <EditContainer>
              <Icon name='pencil-square' size='2rem' />
              <p>Edit Relay</p>
            </EditContainer>
          </StyledMenuItem>

          <StyledMenuItem onClick={handleOpenRevokeModal} data-test='revoke-button'>
            <RevokeContainer>
              <Icon name='x-circle' size='2rem' />
              <p>Revoke Relay</p>
            </RevokeContainer>
          </StyledMenuItem>
        </>
      </Menu>
    </Dropdown>
  );
}

const StyledListbox = styled('ul')(() => {
  const { currentTheme } = useTheme();
  return {
    border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    color: currentTheme.textSecondary,
    background: currentTheme.backgroundPrimary,
    padding: '0.4rem',
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

const StyledMenuItem = styled(MenuItem)(() => {
  return {
    padding: '0',
    margin: '0',
  };
});

const TriggerButton = styled(MenuButton)(() => {
  const { currentTheme } = useTheme();
  return {
    maxWidth: '8.5rem',
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
  const { currentTheme } = useTheme();
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
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textPrimary,
    borderRadius: currentTheme.borderRadius,
    '&:hover': {
      transition: currentTheme.basicTransition,
      backgroundColor: currentTheme.backgroundHover,
    },
  };
});

const RevokeContainer = styled(EditContainer)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.error,
  };
});
