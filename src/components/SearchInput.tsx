import { InputAdornment, FormControl, styled } from '@mui/material';

import { Icon } from './Icon';
import { SOutlinedInput } from './Input';
import { useTheme } from '~/hooks';

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, setValue, placeholder }: SearchInputProps) => {
  return (
    <FormControl sx={{ my: '2rem' }} fullWidth>
      <SInput
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position='start'>
            <Icon name='search' size='2rem' />
          </InputAdornment>
        }
        endAdornment={
          !!value && (
            <InputAdornment position='end'>
              <CloseIcon name='close' onClick={() => setValue('')} />
            </InputAdornment>
          )
        }
        sx={{
          fontSize: 16,
          borderRadius: '0.8rem',
          input: {
            py: '1.25rem',
          },
        }}
      />
    </FormControl>
  );
};

const SInput = styled(SOutlinedInput)(() => {
  const { currentTheme } = useTheme();
  return {
    paddingLeft: '1.4rem',
    '&.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth:hover': {
      borderColor: currentTheme.textDisabled,
      transition: currentTheme.basicTransition,
    },
  };
});

const CloseIcon = styled(Icon)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    cursor: 'pointer',
    fontSize: '2rem',
    marginRight: '1.4rem',
    '&:hover': {
      color: currentTheme.textPrimary,
      transition: currentTheme.basicTransition,
    },
  };
});
