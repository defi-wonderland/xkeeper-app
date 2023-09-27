import { styled } from '@mui/system';
import defaultImage from '~/assets/defaultToken.png';

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
`;

export const TokenIcon = ({ chainName, tokenAddress }: TokenIconProps) => {
  return (
    <Image
      alt={chainName}
      src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/assets/${tokenAddress}/logo.png`}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError={(ev: any) => {
        ev.target.src = defaultImage;
      }}
    />
  );
};
