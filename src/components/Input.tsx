import { Box, FormControl, OutlinedInput, Typography, styled, SxProps, Theme } from '@mui/material';

import { useStateContext } from '~/hooks';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export const StyledInput = ({ value, setValue, label, description, placeholder, disabled, sx }: InputProps) => {
  return (
    <InputContainer sx={sx}>
      {!!label && <InputLabel>{label}</InputLabel>}

      <FormControl fullWidth disabled={disabled}>
        <SOutlinedInput fullWidth value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
      </FormControl>

      {!!description && <InputDescription>{description}</InputDescription>}
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

const InputDescription = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textDisabled,
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: 400,
  };
});

const SOutlinedInput = styled(OutlinedInput)(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.6rem',
    borderRadius: currentTheme.borderRadius,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    padding: 0,
    div: {
      border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    },
    input: {
      padding: '1rem 1.4rem',
      color: currentTheme.textPrimary,
    },
  };
});
