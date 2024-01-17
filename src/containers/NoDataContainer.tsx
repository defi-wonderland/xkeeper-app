import { styled } from '@mui/material';
import React from 'react';
import { StyledText } from '~/components';
import { useTheme } from '~/hooks';

interface NoDataContainerProps {
  text?: string;
  children?: React.ReactNode;
  dataTest?: string;
}
export const NoDataContainer = ({ text, children, dataTest }: NoDataContainerProps) => {
  return (
    <SNoDataContainer data-test={dataTest}>
      {children}
      <StyledText>{text}</StyledText>
    </SNoDataContainer>
  );
};

const SNoDataContainer = styled('div')(() => {
  const { currentTheme } = useTheme();
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingBottom: '2.4rem',
    p: {
      color: currentTheme.textDisabled,
    },
  };
});
