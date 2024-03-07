import { Box, Breadcrumbs, IconButton, styled } from '@mui/material';

import { useTheme } from '~/hooks';
import { Icon, NavigationLink, StyledText } from '~/components';
import { useParams } from 'react-router-dom';

interface BreadCrumbsProps {
  currentPage: string;
  previousPage: string;
}

export const BreadCrumbs = ({ currentPage, previousPage }: BreadCrumbsProps) => {
  const { currentTheme } = useTheme();
  const { chain } = useParams();

  const breadcrumbs = [
    <PreviousPage key='1' sx={{ color: currentTheme.textDisabled }}>
      <NavigationLink to={`/${chain}`}>{previousPage}</NavigationLink>
    </PreviousPage>,
    <CurrentPage key='2' sx={{ color: currentTheme.infoChipColor }}>
      {currentPage}
    </CurrentPage>,
  ];

  return (
    <BreadCrumbsContainer>
      {/* Back Button */}
      <NavigationLink to={`/${chain}`}>
        <BackBtn
          sx={{ background: currentTheme.backgroundPrimary, border: `1px solid ${currentTheme.backButtonBorderColor}` }}
        >
          <Icon name='arrow-left' color={currentTheme.textDisabled} size='2rem' />
        </BackBtn>
      </NavigationLink>

      {/* Breadcrumbs */}
      <Breadcrumbs
        sx={{ my: '2rem' }}
        separator={<Icon name='chevron-right' color={currentTheme.textSecondaryDisabled} size='1.8rem' />}
        aria-label='breadcrumb'
      >
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

  '@media (max-width: 600px)': {
    display: 'none',
  },
});

const CurrentPage = styled(StyledText)({
  fontSize: '1.4rem',
  fontWeight: 500,
});

const PreviousPage = styled(StyledText)({
  fontSize: '1.4rem',
  fontWeight: 500,
  opacity: 0.8,
});

const BackBtn = styled(IconButton)(() => {
  const { currentTheme } = useTheme();
  return {
    borderRadius: '0.8rem',
    border: '1px solid ',
    borderColor: currentTheme.backButtonBorderColor,
    padding: '0.8rem',
    '&:hover': {
      boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      backgroundColor: currentTheme.backgroundSecondary,
      borderColor: currentTheme.textDisabled,
    },
  };
});
