import { PriceData } from '~/types';
import { fetchData } from './getContractAbi';

export const getPricesUrl = (chainName: string, address: string[]) => {
  const addresses = address.join(`,${chainName}:`);
  return `https://coins.llama.fi/prices/current/${chainName}:${addresses}`;
};

export const getPrices = async (chain: string, contractAddress: string[]): Promise<PriceData> => {
  // temporary disabled
  // try {
  //   const url = getPricesUrl(chain, contractAddress);
  //   const jsonData = await fetchData(url);
  //   return jsonData;
  // } catch (error) {
  // console.error(error);
  console.log('getPrices', chain, contractAddress, fetchData);
  return {} as PriceData;
  // }
};
