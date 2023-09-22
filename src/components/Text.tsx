import { styled } from '@mui/material';
import { useStateContext } from '~/hooks';

export const StyledTitle = styled('h1')(() => {
  const { currentTheme } = useStateContext();
  return {
    textTransform: 'capitalize',
    fontSize: '2rem',
    lineHeight: '2.8rem',
    margin: 0,
    padding: 0,
    fontWeight: 'bold',
    color: currentTheme.textPrimary,
  };
});

export const StyledText = styled('p')(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.4rem',
    lineHeight: '2rem',
    margin: 0,
    padding: 0,
    fontWeight: 400,
    color: currentTheme.textTertiary,
    span: {
      fontWeight: 500,
    },
  };
});
