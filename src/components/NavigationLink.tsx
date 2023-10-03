import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  text?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

export const NavigationLink = ({ to, text, children, sx, disabled }: NavigationLinkProps) => {
  return (
    <Box sx={{ ...sx, a: { textDecoration: 'none', color: 'inherit' } }}>
      {disabled && <>{children ? children : text}</>}
      {!disabled && <Link to={to}>{children ? children : text}</Link>}
    </Box>
  );
};
