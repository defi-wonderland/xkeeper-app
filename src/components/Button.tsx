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
      transition: currentTheme.basicTransition,
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
    color: currentTheme.actionButtonColor,
    borderRadius: currentTheme.borderRadius,
    backgroundColor: currentTheme.actionButton,
    textTransform: 'capitalize',
    fontSize: '1.4rem',
    padding: '1rem 1.6rem',
    width: 'max-content',
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    gap: '0.8rem',
    '&:hover': {
      backgroundColor: currentTheme.actionButtonHover,
      transition: currentTheme.basicTransition,
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    },
    '&:disabled': {
      backgroundColor: currentTheme.actionButtonDisabled,
      color: currentTheme.actionButtonColor,
      cursor: 'default',
    },
  };
});

export const RevokeButton = styled(ActiveButton)(() => {
  const { currentTheme } = useStateContext();
  return {
    backgroundColor: currentTheme.error,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    '&:hover': {
      opacity: 0.9,
      backgroundColor: currentTheme.error,
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    },
    '&:disabled': {
      opacity: 0.6,
      backgroundColor: currentTheme.error,
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    },
  };
});

export const CloseButton = styled(Button)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: 'inherit',
    minWidth: 'auto',
    borderRadius: '100%',
    padding: '0',
    '&:hover': {
      backgroundColor: 'transparent',
      transition: currentTheme.basicTransition,
    },
  };
});