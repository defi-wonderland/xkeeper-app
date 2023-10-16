import { PriceData } from '~/types';
import { fetchData } from './getContractAbi';

export const getPricesUrl = (chainName: string, address: string[]) => {
  const addresses = address.join(`,${chainName}:`);
  return `https://coins.llama.fi/prices/current/${chainName}:${addresses}`;
};

export const getPrices = async (chain: string, contractAddress: string[]): Promise<PriceData> => {
  try {
    const url = getPricesUrl(chain, contractAddress);
    console.log(url);
    const jsonData = await fetchData(url);
    return jsonData;
  } catch (error) {
    console.error(error);
    return {} as PriceData;
  }
};
