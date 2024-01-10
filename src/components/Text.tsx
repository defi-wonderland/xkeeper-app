import { styled } from '@mui/material';
import { useTheme } from '~/hooks';

export const StyledTitle = styled('h1')(() => {
  const { currentTheme } = useTheme();
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
  const { currentTheme } = useTheme();
  return {
    fontSize: '1.4rem',
    lineHeight: '2rem',
    margin: 0,
    padding: 0,
    fontWeight: 400,
    color: currentTheme.textSecondary,
    span: {
      fontWeight: 500,
    },
  };
});

export const SubTitle = styled(StyledText)(() => {
  const {
    currentTheme: { textDisabled },
  } = useTheme();
  return {
    color: textDisabled,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 400,
    marginTop: '0.8rem',
    span: {
      fontWeight: 500,
    },
  };
});
