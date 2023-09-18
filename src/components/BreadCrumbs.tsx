import { Box, Breadcrumbs, Typography, IconButton } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

import { useStateContext } from '~/hooks';
import { NavigationLink } from '.';

interface BreadCrumbsProps {
  currentPage: string;
  previousPage: string;
}

export const BreadCrumbs = ({ currentPage, previousPage }: BreadCrumbsProps) => {
  const { currentTheme } = useStateContext();

  const breadcrumbs = [
    <PreviousPage key='1' sx={{ color: currentTheme.textDisabled }}>
      {previousPage}
    </PreviousPage>,
    <CurrentPage key='2' sx={{ color: currentTheme.infoChipColor }}>
      {currentPage}
    </CurrentPage>,
  ];

  return (
    <BreadCrumbsContainer>
      {/* Back Button */}
      <NavigationLink to='/'>
        <BackBtn
          sx={{ background: currentTheme.backgroundPrimary, border: `1px solid ${currentTheme.backButtonBorderColor}` }}
        >
          <ArrowBackIcon sx={{ fontSize: '2.4rem', color: currentTheme.textDisabled }} />
        </BackBtn>
      </NavigationLink>

      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ my: '2rem' }} separator={<NavigateNextIcon fontSize='medium' />} aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>
    </BreadCrumbsContainer>
  );
};

const BreadCrumbsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '2rem',
});

const CurrentPage = styled(Typography)({
  fontSize: '1.4rem',
  fontWeight: 500,
});

const PreviousPage = styled(Typography)({
  fontSize: '1.4rem',
  fontWeight: 500,
  opacity: 0.8,
});

const BackBtn = styled(IconButton)({
  borderRadius: '0.8rem',
  border: '1px solid #EAECF0',
  padding: '0.4rem',
  opacity: 0.6,
});
