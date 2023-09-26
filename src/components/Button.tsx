import { Button, styled } from '@mui/material';
import { useStateContext } from '~/hooks';

export const CancelButton = styled(Button)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textPrimary,
    borderColor: currentTheme.textSecondaryDisabled,
    borderRadius: currentTheme.borderRadius,
    fontSize: '1.4rem',
    textTransform: 'none',
    padding: '1rem 1.6rem',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    width: '100%',
    '&:hover': {
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      backgroundColor: currentTheme.backgroundSecondary,
      borderColor: currentTheme.textDisabled,
    },
    '&:disabled': {
      backgroundColor: currentTheme.backgroundSecondary,
      cursor: 'default',
    },
  };
});

export const ActiveButton = styled(Button)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.white,
    borderRadius: currentTheme.borderRadius,
    backgroundColor: currentTheme.actionButton,
    textTransform: 'capitalize',
    fontSize: '1.4rem',
    padding: '1rem 1.6rem',
    width: '100%',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    '&:hover': {
      backgroundColor: currentTheme.actionButtonHover,
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    },
    '&:disabled': {
      backgroundColor: currentTheme.actionButtonDisabled,
      color: currentTheme.white,
      cursor: 'default',
    },
  };
});

export const RevokeButton = styled(ActiveButton)(() => {
  const { currentTheme } = useStateContext();
  return {
    backgroundColor: currentTheme.red,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    '&:hover': {
      opacity: 0.9,
      backgroundColor: currentTheme.red,
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    },
  };
});

export const CloseButton = styled(Button)(() => {
  return {
    color: 'inherit',
    minWidth: 'auto',
    borderRadius: '100%',
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  };
});
