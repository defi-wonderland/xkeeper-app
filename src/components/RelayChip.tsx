import { Chip } from '@mui/material';

export const RelayChip = ({ text }: { text: string }) => {
  return <Chip color='success' label={text} size='medium' sx={{ fontSize: '1.2rem' }} />;
};
