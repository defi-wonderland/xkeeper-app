import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  RevokeButton,
  AddressChip,
  CloseButton as EditAliasButton,
  Icon,
  InfoChip,
  STooltip,
  StyledText,
} from '~/components';
import { useTheme } from '~/hooks';
import { VaultData } from '~/types';

interface VaultHeaderProps {
  handleOpenAddMetadata: () => void;
  handleEditAlias: () => void;
  selectedVault?: VaultData;
  userAddress?: string;
  vaultTitle: string;
  chainName: string;
}

export const VaultHeader = ({
  handleOpenAddMetadata,
  handleEditAlias,
  selectedVault,
  vaultTitle,
  userAddress,
  chainName,
}: VaultHeaderProps) => {
  const version = 'V1.0.0';
  const { currentTheme } = useTheme();

  return (
    <div>
      <Header>
        {/* Vault Address | Vault Alias */}
        <TitleContainer>
          <TitleBox>
            <Title data-test='vault-name'>{vaultTitle}</Title>

            <STooltip text='Edit vault alias'>
              <EditAliasButton variant='text' onClick={handleEditAlias}>
                <Icon name='pencil-square' color={currentTheme.textDisabled} size='2rem' />
              </EditAliasButton>
            </STooltip>
          </TitleBox>

          {/* Owner Icon */}
          <STooltip text='You own this vault'>
            <SInfoChip>
              <Icon name='owned' />
            </SInfoChip>
          </STooltip>
        </TitleContainer>

        <DataSection>
          {/* Contract and Owner addresses */}
          <DataContainer>
            <AddressChip label='Contract' text={selectedVault?.address || ''} />
            <AddressChip label='Owner' text={selectedVault?.owner || ''} />
          </DataContainer>

          {/* Vault version and Chain */}
          <SecondDataContainer>
            <Version sx={{ color: currentTheme.textDisabled }}>{version}</Version>
            <InfoChip>{chainName}</InfoChip>
          </SecondDataContainer>
        </DataSection>

        <DescriptionContainer>
          {/* Vault Description */}
          {selectedVault?.description && (
            <Description>
              {selectedVault.description + selectedVault.description + selectedVault.description}
            </Description>
          )}

          {!selectedVault?.description && (
            <DescriptionChip>
              <Icon name='exclamation-triangle' size='2.4rem' color={currentTheme.warningChipColor} />
              Define your vault metadata for keepers to better understand your jobs.
              {selectedVault?.owner === userAddress && (
                // Add vault description button
                <DescriptionButton
                  data-test='add-vault-metadata-button'
                  disabled={selectedVault?.owner !== userAddress}
                  onClick={handleOpenAddMetadata}
                >
                  Add Metadata
                </DescriptionButton>
              )}
            </DescriptionChip>
          )}
        </DescriptionContainer>
      </Header>
    </div>
  );
};

export const Header = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  alignItems: 'start',
  justifyContent: 'center',
  width: '100%',
  marginTop: '2.8rem',
  marginBottom: '2rem',
});

const TitleContainer = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
});

const TitleBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  gap: '0.8rem',
});

export const Title = styled(Typography)({
  fontSize: '3rem',
  lineHeight: '3.8rem',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '70rem',
});

export const DataSection = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1.4rem',
  },
});

const DataContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.8rem',

  '@media (max-width: 600px)': {
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1.4rem',
  },
});

const SecondDataContainer = styled(DataContainer)({
  '@media (max-width: 600px)': {
    flexDirection: 'row',
  },
});

const Version = styled(Typography)({
  fontSize: '1.4rem',
  fontWeight: '400',
  lineHeight: '2rem',
  padding: '0.2rem 1rem',
});

const SInfoChip = styled(Box)(() => {
  const { currentTheme } = useTheme();

  return {
    color: currentTheme.infoChipColor,
    backgroundColor: currentTheme.infoChipBackground,
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    fontWeight: '500',
    height: 'auto',
    borderRadius: '100%',
    padding: '0.6rem 0.6rem 0.5rem 0.6rem',
    lineHeight: '2rem',
    width: 'fit-content',
  };
});

const DescriptionContainer = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexDirection: 'row',
  paddingTop: '0.8rem',
});

export const Description = styled(StyledText)(() => {
  const { currentTheme } = useTheme();
  return {
    color: currentTheme.textSecondary,
    fontSize: '1.6rem',
  };
});

const DescriptionChip = styled(Box)(() => {
  const { currentTheme, theme } = useTheme();
  const border = theme === 'light' ? `1px solid ${currentTheme.warningChipColor}` : undefined;
  return {
    color: currentTheme.warningChipColor,
    backgroundColor: currentTheme.warningChipBackground,
    borderRadius: currentTheme.borderRadius,
    fontSize: '1.6rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontWeight: '500',
    height: 'auto',
    padding: '1rem',
    paddingLeft: '1.6rem',
    lineHeight: '2rem',
    width: '100%',
    minHeight: '6.65rem',
    border,

    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'center',
      '& button': {
        marginLeft: '0',
        width: '100%',
      },
    },
  };
});

const DescriptionButton = styled(RevokeButton)(() => {
  const { currentTheme } = useTheme();

  return {
    marginLeft: 'auto',
    color: currentTheme.warningChipColor,
    backgroundColor: currentTheme.warningChipBackground,
    border: `1px solid ${currentTheme.warningChipColor}`,
    '&:hover': {
      backgroundColor: currentTheme.warningChipColor,
      color: currentTheme.warningChipBackground,
    },
    '&:disabled': {
      opacity: 0.6,
      color: currentTheme.actionButtonColor,
    },
  };
});
