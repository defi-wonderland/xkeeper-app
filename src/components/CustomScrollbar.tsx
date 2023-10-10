import { styled, Box } from '@mui/material';

import { useStateContext } from '~/hooks';

export const CustomScrollbar = styled(Box)(() => {
  const { currentTheme } = useStateContext();
  return {
    overflowY: 'auto',
    overflowX: 'hidden',

    ['&::-webkit-scrollbar']: {
      width: '0.6rem',
      height: ' 0.6rem',
      background: currentTheme.backgroundPrimary,
    },

    ['&::-webkit-scrollbar-thumb']: {
      background: currentTheme.textSecondaryDisabled,
      borderRadius: '0.4rem',
    },

    [' &::-webkit-scrollbar-thumb:hover']: {
      background: currentTheme.textDisabled,
    },

    [' &::-webkit-scrollbar-thumb:active']: {
      background: currentTheme.textDisabled,
    },
  };
});
