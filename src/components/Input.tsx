import React, { useState } from 'react';
import { Box, styled, SxProps, Theme, InputAdornment, InputBase } from '@mui/material';

import { useTheme } from '~/hooks';
import { Icon, IconName, STooltip, StyledText } from '~/components';
import { TextButton } from '~/containers';

interface InputProps {
  value: string;
  setValue?: (value: string) => void;
  label?: string;
  description?: string | React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  sx?: SxProps<Theme>;
  errorText?: string;
  copyable?: boolean;
  number?: boolean;
  tokenSymbol?: string;
  removable?: boolean;
  customIconName?: IconName;
  isAutoFocus?: boolean;
  addable?: boolean;
  onClick?: () => void;
  onKeyUp?: () => void;
  dataTestId?: string;
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
  isAutoFocus,
  customIconName,
  dataTestId,
  addable,
  onClick,
  onKeyUp,
}: InputProps) => {
  const { currentTheme } = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const onInputClick = () => {
    if (disabled || !onClick) return;
    onClick();
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onKeyUp && onKeyUp();
    }
  };

  const handleCopy = () => {
    if (!copyable) return;
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <InputContainer onClick={handleCopy} isCopyable={copyable} sx={{ ...sx }}>
      {!!label && <InputLabel>{label}</InputLabel>}

      <SBox disabled={disabled}>
        <SOutlinedInput
          data-test={dataTestId}
          isError={error}
          isRemovable={!setValue && removable}
          fullWidth
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
          onKeyUp={onKeyPress}
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
                  <SIcon name={isCopied ? 'check' : 'copy'} size='1.7rem' color={currentTheme.textSecondary} />
                </SInputAdornment>
              )}

              {removable && !disabled && !error && (
                <SInputAdornment onClick={onInputClick} position='end'>
                  <SIcon name={customIconName || 'close'} size='1.8rem' color={currentTheme.textSecondary} />
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

              {addable && !error && (
                <AmountInputAdornment position='end'>
                  <STextButton variant='text' onClick={onInputClick} disabled={disabled}>
                    Add
                  </STextButton>
                </AmountInputAdornment>
              )}
            </React.Fragment>
          }
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={isAutoFocus} // we need to enable autoFocus to have a better UX
        />
      </SBox>

      {!!description && (
        <>
          {!error && <InputDescription>{description}</InputDescription>}
          {error && <ErrorDescription>{description}</ErrorDescription>}
        </>
      )}
    </InputContainer>
  );
};

const InputContainer = styled(Box)(({ isCopyable }: { isCopyable?: boolean }) => {
  const { currentTheme } = useTheme();

  const copyableStyles = isCopyable && {
    div: {
      background: currentTheme.inputDisabledBackground,
    },
    input: {
      cursor: isCopyable ? 'pointer' : 'text',
      color: `${currentTheme.textDisabled} !important`,
    },
    'i:before': {
      color: currentTheme.textDisabled,
    },
  };

  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    marginBottom: '2.4rem',
    width: '100%',
    ...copyableStyles,
  };
});

export const InputLabel = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    cursor: 'default',
  };
});

export const InputDescription = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
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
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.error,
  };
});

export const SBox = styled(Box)(({ disabled }: { disabled?: boolean }) => {
  const { currentTheme } = useTheme();
  const background: string = disabled ? currentTheme.inputDisabledBackground : 'inherit';
  const color: string = disabled ? currentTheme.textDisabled : 'inherit';
  return {
    borderRadius: currentTheme.borderRadius,
    background,
    input: {
      color,
    },
  };
});

export const SOutlinedInput = styled(InputBase)(({
  isError,
  isRemovable,
}: {
  isError?: boolean;
  isRemovable?: boolean;
}) => {
  const { currentTheme } = useTheme();
  const errorStyles = isError && {
    borderColor: currentTheme.error,
    '&.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth:hover': {
      borderColor: currentTheme.error,
    },
  };

  const removableStyles = isRemovable && {
    background: currentTheme.inputDisabledBackground,
    color: currentTheme.textDisabled,
    '&.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth:hover': {
      borderColor: 'none',
    },
  };

  return {
    fontSize: '1.6rem',
    borderRadius: currentTheme.borderRadius,
    padding: 0,
    border: currentTheme.inputBorder,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    input: {
      padding: '1rem 1.4rem',
      borderRadius: currentTheme.borderRadius,
    },
    '& input::placeholder': {
      color: currentTheme.textDisabled,
      fontWeight: 500,
      opacity: 1,
    },
    ['input::-webkit-outer-spin-button,input::-webkit-inner-spin-button']: {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth:hover': {
      borderColor: currentTheme.textDisabled,
      transition: currentTheme.basicTransition,
    },

    '@media (max-width: 600px)': {
      input: {
        textOverflow: 'ellipsis',
      },
    },
    ...errorStyles,
    ...removableStyles,
  };
});

const SIcon = styled(Icon)(() => {
  const { currentTheme } = useTheme();

  return {
    padding: '1rem',
    fontSize: '1.6rem',
    '&:hover:before': {
      color: currentTheme.textPrimary,
      transition: currentTheme.basicTransition,
    },
  };
});

const SInputAdornment = styled(InputAdornment)(() => {
  return {
    cursor: 'pointer',
  };
});

const AmountInputAdornment = styled(SInputAdornment)(() => {
  const { currentTheme } = useTheme();
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
