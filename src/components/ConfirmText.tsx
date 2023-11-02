import { CircularProgress, styled } from '@mui/material';

interface Props {
  isLoading?: boolean;
}

export const ConfirmText = ({ isLoading }: Props) => {
  return (
    <>
      {!isLoading && 'Confirm'}
      {isLoading && <SCircularProgress size={24} />}
    </>
  );
};

const SCircularProgress = styled(CircularProgress)(() => {
  return {
    color: '#fff', // hardcoded because it won't change between themes
  };
});
