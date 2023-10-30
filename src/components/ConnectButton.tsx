import { styled } from '@mui/material';
import { useAccountModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { CancelButton } from '~/components';
import { useStateContext } from '~/hooks';
import { truncateAddress } from '~/utils';

export const ConnectButton = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();

  const handleClick = () => {
    if (address && openAccountModal) {
      openAccountModal();
    } else if (openConnectModal) {
      openConnectModal();
    }
  };

  return (
    <SButton onClick={handleClick} isConnected={!!address}>
      {!address && 'Connect Wallet'}
      {address && truncateAddress(address)}
    </SButton>
  );
};

interface Props {
  isConnected?: boolean;
}
const SButton = styled(CancelButton)(({ isConnected }: Props) => {
  const { currentTheme } = useStateContext();

  const connectedStyles = isConnected && {
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
