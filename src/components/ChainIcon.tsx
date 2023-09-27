import { styled } from '@mui/system';
import defaultImage from '~/assets/default.png';

interface ChainIconProps {
  chainName: string;
  alt?: string;
}

const Image = styled('img')`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 100%;
  background-color: inherit;
  color: inherit;
  border-radius: inherit;
`;

export const ChainIcon = ({ chainName }: ChainIconProps) => {
  return (
    <Image
      alt={chainName}
      src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/info/logo.png`}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError={(ev: any) => {
        ev.target.src = defaultImage;
      }}
    />
  );
};
