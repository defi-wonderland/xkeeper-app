import { Box, Button, FormControl, OutlinedInput, Typography, styled } from '@mui/material';

import { DataSection as DescriptionContainer, Title, Header } from '~/pages/Vault';
import { BreadCrumbs, VersionChip } from '~/components';
import { useStateContext } from '~/hooks';
import ChainDropdown from '~/components/Dropdown';

export const CreateVault = () => {
  return (
    <PageContainer>
      <BreadCrumbs previousPage='Home' currentPage='Create Vault' />

      <CreateContainer>
        <Header>
          <TitleBox>
            <Title>Create Vault</Title>
            <VersionChip text='V1.0.0' />
          </TitleBox>

          <DescriptionContainer>
            <Description>
              Lorem ipsum dolor sit amet consectetur. Euismod blandit dictum lacus penatibus. In morbi et ut amet
              consectetur arcu. Dui in netus eget nulla lorem nibh erat felis.
            </Description>
          </DescriptionContainer>
        </Header>

        <InputContainer>
          <InputLabel>Vault name</InputLabel>
          <FormControl fullWidth>
            <SOutlinedInput fullWidth />
          </FormControl>
          <InputDescription>Your vault name will only be visible to you.</InputDescription>
        </InputContainer>

        <InputContainer>
          <InputLabel>Vault owner</InputLabel>
          <FormControl fullWidth>
            <SOutlinedInput fullWidth />
          </FormControl>
          <InputDescription>
            The vault owner will be able to withdraw funds and make changes to the vault.
          </InputDescription>
        </InputContainer>

        <InputContainer>
          <InputLabel>Chain</InputLabel>
          <ChainDropdown />
        </InputContainer>

        {/* Create Button */}
        <ButtonContainer>
          <CreateButton variant='contained'>Create Vault</CreateButton>
        </ButtonContainer>
      </CreateContainer>
    </PageContainer>
  );
};

const PageContainer = styled(Box)({
  width: '100%',
  margin: '0 auto',
  padding: '9.6rem 4.8rem',
  backgroundColor: 'inherit',
  minHeight: '100vh',
});

const CreateContainer = styled(Box)({
  maxWidth: '60rem',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
});

const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'start',
  flexDirection: 'row',
  gap: '0.8rem',
});

const Description = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textTertiary,
    fontSize: '1.4rem',
  };
});

const InputContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginBottom: '2.4rem',
});

const InputLabel = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
  };
});

const InputDescription = styled(Typography)(() => {
  const { currentTheme } = useStateContext();
  return {
    color: currentTheme.textDisabled,
    fontSize: '1.2rem',
    lineHeight: '1.6rem',
    fontWeight: 400,
  };
});

const SOutlinedInput = styled(OutlinedInput)(() => {
  const { currentTheme } = useStateContext();

  return {
    fontSize: '1.6rem',
    borderRadius: currentTheme.borderRadius,
    boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    padding: 0,
    div: {
      border: `1px solid ${currentTheme.textSecondaryDisabled}`,
    },
    input: {
      padding: '1rem 1.4rem',
    },
  };
});

const ButtonContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  width: '100%',
  marginTop: '3.2rem',
});

const CreateButton = styled(Button)(() => {
  const { currentTheme } = useStateContext();
  return {
    fontSize: '1.4rem',
    textTransform: 'none',
    padding: '1rem 1.6rem',
    boxShadow: 'none',
    borderRadius: currentTheme.borderRadius,
    backgroundColor: currentTheme.actionButton,
    width: '18.3rem',
  };
});
