import { Box, styled } from '@mui/material';
import { StyledText } from '~/components';
import { useTheme } from '~/hooks';
import WonderlandLogo from '~/assets/wonderland.svg';

export const MadeByWonderland = () => {
  const handleClick = () => {
    window.open('https://defi.sucks/', '_blank');
  };

  return (
    <SBox onClick={handleClick}>
      <StyledText>Made with 🤍 by</StyledText>
      <img src={WonderlandLogo} alt='Wonderland' />
    </SBox>
  );
};

const SBox = styled(Box)(() => {
  const { currentTheme, theme } = useTheme();
  const logoFilter = theme === 'dark' ? 'none' : 'invert(1)';
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
    opacity: 0.5,
    p: {
      color: currentTheme.textPrimary,
    },
    '&:hover ': {
      opacity: 1,
      transition: 'all 0.3s ease-in-out',
    },
    '@media (max-width: 1320px)': {
      flexDirection: 'column',
      alignItems: 'start',
    },
    '@media (max-width: 1180px)': {
      display: 'none',
    },
    img: {
      width: '13rem',
      filter: logoFilter,
      marginTop: '-0.2rem',
    },
  };
});
