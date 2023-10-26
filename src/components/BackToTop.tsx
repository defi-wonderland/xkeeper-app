import { Box, styled } from '@mui/material';
import { Icon, StyledText } from '~/components';
import { useStateContext } from '~/hooks';

export const BackToTop = () => {
  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <SBox onClick={handleClick}>
      <SIcon name='arrow-right' />
      <StyledText>Back to top</StyledText>
    </SBox>
  );
};

const SBox = styled(Box)(() => {
  const { currentTheme } = useStateContext();

  return {
    position: 'fixed',
    bottom: '3rem',
    right: '3rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    cursor: 'pointer',
    gap: '0.8rem',
    color: currentTheme.textDisabled,
    '&:hover': {
      '& p, & i:before': {
        color: currentTheme.textPrimary,
        transition: 'color 0.3s ease-in-out',
      },
    },
    '@media (max-width: 1180px)': {
      display: 'none',
    },
  };
});

const SIcon = styled(Icon)(() => {
  return {
    rotate: '-90deg',
  };
});
