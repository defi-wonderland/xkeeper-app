import { useSnackbar, ClickAwayListener } from '@mui/base';
import { css, keyframes, styled } from '@mui/system';
import { Button } from '@mui/material';

import { useStateContext } from '~/hooks';
import { StyledText, StyledTitle } from './Text';
import { zIndex } from '~/utils';

export function UseSnackbar() {
  const { notificationOpen, setNotificationOpen } = useStateContext();

  const handleClose = () => {
    setNotificationOpen(false);
  };

  const { getRootProps, onClickAway } = useSnackbar({
    onClose: handleClose,
    open: notificationOpen,
    autoHideDuration: 5000,
  });

  return (
    <>
      {notificationOpen && (
        <ClickAwayListener onClickAway={onClickAway}>
          <CustomSnackbar {...getRootProps()}>
            {/* TODO: add icons and dynamic text */}
            <div>✅</div>
            <TextContainer>
              <Title>Title</Title>
              <Text>Example text</Text>
            </TextContainer>
            <Button variant='text' onClick={handleClose}>
              ✖
            </Button>
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

const CustomSnackbar = styled('div')(() => {
  const { currentTheme } = useStateContext();
  return css`
    background-color: ${currentTheme.backgroundPrimary};
    position: fixed;
    z-index: ${zIndex.TOAST};
    display: flex;
    gap: 2rem;
    right: 1.6rem;
    bottom: 1.6rem;
    left: auto;
    justify-content: start;
    width: 40rem;
    border-radius: 8px;
    border: none;
    box-shadow:
      0px 4px 6px -2px rgba(16, 24, 40, 0.03),
      0px 12px 16px -4px rgba(16, 24, 40, 0.08);
    padding: 0.75rem;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    animation: ${snackbarInRight} 200ms;
    transition: transform 0.2s ease-out;
  `;
});

const TextContainer = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    width: '100%',
  };
});

const Title = styled(StyledTitle)(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 600,
    color: currentTheme.textPrimary,
  };
});

const Text = styled(StyledText)(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    color: currentTheme.textTertiary,
  };
});
