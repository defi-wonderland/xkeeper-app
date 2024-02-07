import { styled } from '@mui/material';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect } from 'wagmi';

import { CancelButton } from '~/components';
import { getConfig } from '~/config';
import { useTheme } from '~/hooks';
import { truncateAddress } from '~/utils';

export const ConnectButton = () => {
  const { TEST_MODE } = getConfig();

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { connect, connectors } = useConnect();

  const handleClick = () => {
    if (TEST_MODE) {
      connect({ connector: connectors[0] });
      return;
    }

    if (address && openAccountModal) {
      openAccountModal();
    } else if (openConnectModal) {
      openConnectModal();
    }
  };

  return (
    <SButton onClick={handleClick} connected={address?.toString()} data-test='connect-button'>
      {!address && 'Connect Wallet'}
      {address && truncateAddress(address)}
    </SButton>
  );
};

interface Props {
  connected?: string;
}
const SButton = styled(CancelButton)(({ connected }: Props) => {
  const { currentTheme } = useTheme();

  const connectedStyles = connected && {
    border: 'none',
    color: currentTheme.infoChipColor,
    backgroundColor: currentTheme.infoChipBackground,
    '&:hover': {
      backgroundColor: currentTheme.infoChipBackground,
      opacity: 0.9,
      transition: currentTheme.basicTransition,
    },
  };
  return {
    border: '0.1rem solid ' + currentTheme.textSecondaryDisabled,
    ...connectedStyles,
  };
});
