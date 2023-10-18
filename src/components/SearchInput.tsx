import { InputAdornment, FormControl, styled } from '@mui/material';

import { Icon } from './Icon';
import { SOutlinedInput } from './Input';
import { useStateContext } from '~/hooks';

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
        type='search'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position='start'>
            <Icon name='search' size='2rem' />
          </InputAdornment>
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
  const { currentTheme } = useStateContext();
  return {
    paddingLeft: '1.4rem',
    '&.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-fullWidth:hover': {
      borderColor: currentTheme.textDisabled,
      transition: 'all 0.2s ease-in-out',
    },
  };
});
