import { styled, Switch } from '@mui/material';

import { useTheme } from '~/hooks';

export const SSwitch = styled(Switch)(({ theme }) => {
  const { currentTheme } = useTheme();

  return {
    width: '2.8rem',
    height: '1.6rem',
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: '1.5rem',
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: '0.2rem',
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: currentTheme.actionButton,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 0.2rem 0.4rem 0 rgb(0 35 11 / 20%)',
      width: '1.2rem',
      height: '1.2rem',
      borderRadius: '0.6rem',
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: currentTheme.textSecondaryDisabled,
      boxSizing: 'border-box',
    },
  };
});
