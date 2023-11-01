import React, { useState } from 'react';
import { Box, Typography, styled, SxProps, Theme, InputAdornment, InputBase } from '@mui/material';

import { useStateContext } from '~/hooks';
import { Icon, STooltip, StyledText } from '~/components';
import { TextButton } from '~/containers';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  description?: string | React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  sx?: SxProps<Theme>;
  errorText?: string;
  copyable?: boolean;
  number?: boolean;
  onClick?: () => void;
  tokenSymbol?: string;
  removable?: boolean;
}

export const StyledInput = ({
  value,
  setValue,
  label,
  description,
  placeholder,
  disabled,
  error,
  errorText,
  sx,
  copyable,
  number,
  tokenSymbol,
  removable,
  onClick,
}: InputProps) => {
  const { currentTheme } = useStateContext();
  const [isCopied, setIsCopied] = useState(false);

  const onInputClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };

  const handleCopy = () => {
    if (!copyable) return;
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  let copyableSx: SxProps<Theme> | null = null;
  if (copyable) {
    copyableSx = {
      div: {
        background: currentTheme.backgroundHover,
      },
      input: {
        cursor: copyable ? 'pointer' : 'text',
        color: `${currentTheme.textDisabled} !important`,
      },
      'i:before': {
        color: currentTheme.textDisabled,
      },
    };
  }

  return (
    <InputContainer onClick={handleCopy} sx={{ ...sx, ...copyableSx }}>
      {!!label && <InputLabel>{label}</InputLabel>}

      <SOutlinedInput
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        error={error}
        type={number ? 'number' : 'text'}
        readOnly={copyable || disabled}
        endAdornment={
          <React.Fragment>
            {error && (
              <SInputAdornment position='end'>
                <STooltip text={errorText || ''}>
                  <SIcon name='alert-circle' size='1.7rem' color={currentTheme.error} />
                </STooltip>
              </SInputAdornment>
            )}

            {copyable && !error && (
              <SInputAdornment position='end'>
                <SIcon name={isCopied ? 'check' : 'copy'} size='1.7rem' />
              </SInputAdornment>
            )}

            {removable && !error && (
              <SInputAdornment onClick={onInputClick} position='end'>
                <SIcon name={'close'} size='1.8rem' color='inherit' />
              </SInputAdornment>
            )}

            {number && !error && (
              <AmountInputAdornment position='end'>
                <StyledText>{tokenSymbol}</StyledText>
                <STextButton variant='text' onClick={onInputClick} disabled={disabled}>
                  Max
                </STextButton>
              </AmountInputAdornment>
            )}
          </React.Fragment>
        }
      />

      {!!description && (
        <>
          {!error && <InputDescription>{description}</InputDescription>}
          {error && <ErrorDescription>{description}</ErrorDescription>}
        </>
      )}
    </InputContainer>
  );
};

const InputContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
  width: '100%',
});

export const InputLabel = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    cursor: 'default',
  };
});

export const InputDescription = styled('p')(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textTertiary,
    margin: 0,
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: 400,
    span: {
      fontWeight: 500,
      color: currentTheme.textSecondary,
    },
  };
});

const ErrorDescription = styled(InputDescription)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.error,
  };
});

export const SOutlinedInput = styled(InputBase)(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.6rem',
    borderRadius: currentTheme.borderRadius,
    padding: 0,
    border: currentTheme.inputBorder,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    input: {
      padding: '1rem 1.4rem',
      color: currentTheme.textPrimary,
    },
    '& input::placeholder': {
      color: currentTheme.textDisabled,
      fontWeight: 500,
      opacity: 1,
    },
    'i:before': {
      color: currentTheme.textSecondary,
    },
    '&:disabled': {
      backgroundColor: currentTheme.backgroundHover,
      color: currentTheme.textSecondary,
    },
    ['input::-webkit-outer-spin-button,input::-webkit-inner-spin-button']: {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth:hover': {
      borderColor: currentTheme.textDisabled,
      transition: currentTheme.basicTransition,
    },
  };
});

const SIcon = styled(Icon)(() => {
  return {
    marginRight: '1rem',
    fontSize: '1.6rem',
  };
});

const SInputAdornment = styled(InputAdornment)(() => {
  return {
    cursor: 'pointer',
  };
});

const AmountInputAdornment = styled(SInputAdornment)(() => {
  const { currentTheme } = useStateContext();
  return {
    cursor: 'auto',
    gap: '1.2rem',
    p: {
      color: currentTheme.textDisabled,
    },
  };
});

const STextButton = styled(TextButton)(() => {
  return {
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
    fontWeight: 500,
    textTransform: 'none',
    minWidth: 'auto',
    width: 'auto',
    marginRight: '1.2rem',
    '&:hover': {
      fontWeight: 600,
    },
  };
});
