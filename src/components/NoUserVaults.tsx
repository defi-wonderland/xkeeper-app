import { Box, styled } from '@mui/material';
import { StyledText, Icon, ActiveButton, IconName } from '~/components';
import { useTheme } from '~/hooks';

interface NoUserVaultsProps {
  text: string;
  icon: IconName;
  button?: boolean;
}

export const NoUserVaults = ({ text, icon, button }: NoUserVaultsProps) => {
  return (
    <SBox>
      <StyledSafeIcon name={icon} size='3.6rem' />

      <SText>{text}</SText>

      {button && (
        <ActiveButton href='create'>
          <Icon name='plus' size='2rem' />
          Create Vault
        </ActiveButton>
      )}
    </SBox>
  );
};

const SBox = styled(Box)(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6.4rem',
    gap: '2.2rem',
  };
});

const StyledSafeIcon = styled(Icon)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textDisabled,
    background: currentTheme.backButtonBorderColor,
    padding: '1.2rem',
    border: '1.2rem solid',
    borderColor: currentTheme.addressChipBackground,
    borderRadius: '100%',
    opacity: '0.8',
  };
});

const SText = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textDisabled,
    fontWeight: 500,
    fontSize: '1.6rem',
  };
});
