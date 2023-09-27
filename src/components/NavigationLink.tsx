import React from 'react';
import { Variant } from '@mui/material/styles/createTypography';
import { SxProps, Theme, Typography, TypographyPropsVariantOverrides } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  text?: string;
  variant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

export const NavigationLink = ({ to, text, variant, children, sx, disabled }: NavigationLinkProps) => {
  return (
    <Typography variant={variant} sx={{ ...sx, a: { textDecoration: 'none', color: 'inherit' } }}>
      {disabled && <>{children ? children : text}</>}
      {!disabled && <Link to={to}>{children ? children : text}</Link>}
    </Typography>
  );
};
