import { NavigationLink } from '~/components';
import { Chain } from '~/types';

export const getViewTransaction = (hash: string, currentChain: Chain): React.ReactElement => {
  return (
    <NavigationLink to={`${currentChain.scanner}/tx/${hash}`} external>
      View transaction
    </NavigationLink>
  );
};

/**
 * Returns a React element with the address and text to be displayed after the address
 * @param address - address of the vault
 * @param text - text to be displayed after the address
 * @returns - React element
 */
export const getReceiptMessage = (address: string, text: string): React.ReactElement => {
  return (
    <>
      <span>{address}</span> {text}.
    </>
  );
};
