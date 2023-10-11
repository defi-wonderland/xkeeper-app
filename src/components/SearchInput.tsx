import { InputAdornment, FormControl, OutlinedInput } from '@mui/material';

import { Icon } from './Icon';

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, setValue, placeholder }: SearchInputProps) => {
  return (
    <FormControl sx={{ my: '2rem' }} fullWidth>
      <OutlinedInput
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
