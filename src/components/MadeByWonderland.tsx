import { Box, styled } from '@mui/material';
import { StyledText } from '~/components';
import { useStateContext } from '~/hooks';

export const MadeByWonderland = () => {
  const handleClick = () => {
    window.open('https://defi.sucks/', '_blank');
  };

  return (
    <SBox onClick={handleClick}>
      <StyledText>Made with 🤍</StyledText>
      <StyledText>by Wonderland</StyledText>
    </SBox>
  );
};

const SBox = styled(Box)(() => {
  const { currentTheme } = useStateContext();

  return {
    position: 'fixed',
    bottom: '3rem',
    left: '2rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    cursor: 'pointer',
    gap: '0.4rem',
    p: {
      color: currentTheme.textPrimary,
    },
    opacity: 0.5,
    '&:hover': {
      opacity: 1,
      transition: 'all 0.3s ease-in-out',
    },
    '@media (max-width: 1200px)': {
      flexDirection: 'column',
    },
    '@media (max-width: 900px)': {
      display: 'none',
    },
  };
});
