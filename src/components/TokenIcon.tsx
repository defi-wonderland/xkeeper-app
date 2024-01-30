import { styled } from '@mui/system';
import defaultImage from '~/assets/defaultToken.png';
import { getConstants } from '~/config/constants';

interface TokenIconProps {
  chainName: string;
  tokenAddress: string;
  alt?: string;
}

const Image = styled('img')`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 100%;
  background-color: inherit;
  color: inherit;
  border-radius: inherit;
  user-select: none;
  pointer-events: none;
`;

export const TokenIcon = ({ chainName, tokenAddress }: TokenIconProps) => {
  const { DEFAULT_ETH_ADDRESS } = getConstants();
  const customSrc = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/assets/${tokenAddress}/logo.png`;
  const ethSrc = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png`;

  return (
    <Image
      alt={chainName}
      src={tokenAddress === DEFAULT_ETH_ADDRESS ? ethSrc : customSrc}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError={(ev: any) => {
        ev.target.src = defaultImage;
      }}
    />
  );
};
