import { useSnackbar, ClickAwayListener } from '@mui/base';
import { css, keyframes, styled } from '@mui/system';
import { Button } from '@mui/material';

import { useStateContext, useTheme } from '~/hooks';
import { StyledText, StyledTitle, Icon } from '~/components';
import { zIndex } from '~/utils';

export function UseSnackbar() {
  const { notification, setNotification } = useStateContext();
  const { currentTheme } = useTheme();

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open: notification.open,
    autoHideDuration: 5000,
  });

  return (
    <>
      {notification.open && (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar {...getRootProps()}>
            <div>
              <SCheckIcon
                isError={notification?.error}
                name={notification?.error ? 'x-circle' : 'check-circle'}
                size='2rem'
              />
            </div>

            <TextContainer>
              <Title>{notification?.title}</Title>
              <Text>{notification?.message}</Text>
            </TextContainer>

            <SButton variant='text' onClick={handleClose}>
              <Icon name='close' size='2rem' color={currentTheme.textTertiary} />
            </SButton>
          </CustomSnackbar>
        </ClickAwayListener>
      )}
    </>
  );
}

const snackbarInRight = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const snackbarInBottom = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
`;

const CustomSnackbar = styled('div')(() => {
  const { currentTheme } = useTheme();
  return css`
    background-color: ${currentTheme.backgroundPrimary};
    border: ${currentTheme.border};
    border-radius: ${currentTheme.borderRadius};
    z-index: ${zIndex.TOAST};
    position: fixed;
    display: flex;
    gap: 1.4rem;
    right: 1.6rem;
    bottom: 1.6rem;
    left: auto;
    justify-content: start;
    width: 36.8rem;
    box-shadow:
      0px 4px 6px -2px rgba(16, 24, 40, 0.03),
      0px 12px 16px -4px rgba(16, 24, 40, 0.08);
    padding: 1.6rem;
    font-weight: 500;
    animation: ${snackbarInRight} 0.1s;
    transition: transform 0.1s ease-out;
    &:hover {
      border-color: ${currentTheme.textSecondaryDisabled};
      box-shadow: '0px 2px 12px 0px rgba(16, 24, 40, 0.04)';
      transition: ${currentTheme.basicTransition};
    }

    @media (max-width: 600px) {
      width: calc(100% - 3.2rem);
      right: 0rem;
      bottom: 0rem;
      margin: 1.6rem;
      animation: ${snackbarInBottom} 0.1s;
    }
  `;
});

const TextContainer = styled('div')(() => {
  const { currentTheme } = useTheme();
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
    a: {
      color: currentTheme.actionButton,
    },
  };
});

const Title = styled(StyledTitle)(() => {
  const { currentTheme } = useTheme();
  return {
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 600,
    color: currentTheme.textPrimary,
    '&::first-letter': {
      textTransform: 'capitalize',
    },
  };
});

const Text = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    color: currentTheme.textTertiary,
    span: {
      fontWeight: 600,
    },
  };
});

const SButton = styled(Button)(() => {
  const { currentTheme } = useTheme();
  return {
    padding: 0,
    minWidth: 'auto',
    width: '2rem',
    minHeight: 'auto',
    alignItems: 'start',
    '&:hover': {
      background: 'inherit',
    },
    '&:hover i:before': {
      color: currentTheme.textPrimary,
    },
  };
});

interface IconProps {
  isError?: boolean;
}
const SCheckIcon = styled(Icon)(({ isError }: IconProps) => {
  const { currentTheme } = useTheme();
  const color = isError ? currentTheme.error : currentTheme.checkColor;
  const background = isError ? currentTheme.errorBackground : currentTheme.checkBackground;
  const outlineColor = isError ? currentTheme.errorOutlineColor : currentTheme.checkOutlineColor;

  return {
    padding: '0.8rem',
    margin: '0.8rem',
    outline: '0.8rem solid',
    borderRadius: '100%',
    color: color,
    background: background,
    outlineColor: outlineColor,
  };
});
