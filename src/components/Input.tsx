import { Box, FormControl, OutlinedInput, Typography, styled, SxProps, Theme, InputAdornment } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useStateContext } from '~/hooks';
import { STooltip } from '~/components';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  sx?: SxProps<Theme>;
  errorText?: string;
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
}: InputProps) => {
  return (
    <InputContainer sx={sx}>
      {!!label && <InputLabel>{label}</InputLabel>}

      <FormControl fullWidth disabled={disabled}>
        <SOutlinedInput
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          error={error}
          endAdornment={
            <>
              {error && (
                <SInputAdornment position='end'>
                  <STooltip text={errorText || ''}>
                    <SInfoOutlinedIcon />
                  </STooltip>
                </SInputAdornment>
              )}
            </>
          }
        />
      </FormControl>

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

const InputDescription = styled('p')(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textDisabled,
    margin: 0,
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: 400,
  };
});

const ErrorDescription = styled(InputDescription)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.error,
  };
});

const SOutlinedInput = styled(OutlinedInput)(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.6rem',
    borderRadius: currentTheme.borderRadius,
    padding: 0,
    input: {
      padding: '1rem 1.4rem',
      color: currentTheme.textPrimary,
    },
  };
});

const SInfoOutlinedIcon = styled(InfoOutlinedIcon)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.error,
    marginRight: '1rem',
    fontSize: '1.6rem',
  };
});

const SInputAdornment = styled(InputAdornment)(() => {
  return {
    cursor: 'pointer',
  };
});
