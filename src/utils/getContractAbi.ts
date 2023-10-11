export const getContractAbiUrl = (chainName: string, address: string) => {
  return `https://safe-transaction-${chainName}.safe.global/api/v1/contracts/${address}/`;
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('error getting abi');
    return {};
  }
};

export const getContractAbi = async (chain: string, contractAddress: string) => {
  try {
    const chainName = chain === 'ethereum' ? 'mainnet' : chain;
    const url = getContractAbiUrl(chainName, contractAddress);
    const jsonData = await fetchData(url);
    return JSON.stringify(jsonData.contractAbi.abi);
  } catch (error) {
    console.error(error);
    return '';
  }
};
