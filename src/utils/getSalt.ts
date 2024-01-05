import { fromHex } from 'viem';
import { generatePrivateKey } from 'viem/accounts';

// To generate a salt, we generate a random private key
// because viem doesn't have a function to generate random bytes
export const getSalt = () => {
  const saltNonce = generatePrivateKey();
  return fromHex(saltNonce, 'bigint');
};
