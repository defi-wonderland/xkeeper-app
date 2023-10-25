import { CircularProgress } from '@mui/material';

interface Props {
  isLoading?: boolean;
}

export const ConfirmText = ({ isLoading }: Props) => {
  return (
    <>
      {!isLoading && 'Confirm'}
      {isLoading && <CircularProgress color='inherit' size={24} />}
    </>
  );
};
