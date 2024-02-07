export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('error fetching data', error);
    return {};
  }
};

export const getAbiFromSafeApi = async (chainName: string, address: string) => {
  const url = `https://safe-transaction-${chainName}.safe.global/api/v1/contracts/${address}/`;
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return JSON.stringify(jsonData.contractAbi.abi);
  } catch (error) {
    console.error('Error fetching ABI from safe API');
  }
};

export const getAbiFromEtherscanApi = async (apiUrl: string, address: string, apiKey?: string) => {
  const url = `${apiUrl}?module=contract&action=getabi&address=${address}${apiKey ? '&apikey=' + apiKey : ''}`;

  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    const formattedAbi = JSON.parse(jsonData.result);
    return JSON.stringify(formattedAbi);
  } catch (error) {
    console.error('Error fetching ABI from etherscan', error);
  }
};

export const getContractAbi = async (
  chain: string,
  apiUrl: string,
  contractAddress: string,
  etherscanApiKey?: string,
) => {
  try {
    const chainName = chain === 'ethereum' ? 'mainnet' : chain;
    const safeAbiPromise = getAbiFromSafeApi(chainName, contractAddress);
    const etherscanAbiPromise = getAbiFromEtherscanApi(apiUrl, contractAddress, etherscanApiKey);

    const [safeAbi, etherscanAbi] = await Promise.all([safeAbiPromise, etherscanAbiPromise]);

    return safeAbi || etherscanAbi;
  } catch (error) {
    console.error('Error fetching ABI');
    return '';
  }
};
