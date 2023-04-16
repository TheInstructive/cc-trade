import Collections, { CollectionByAddress } from "./collections";
import { getNetworkName, getRemoteTokens } from "./WalletConnect";

function convertTokens(tokens, network) {
  return tokens.map(token => {
    const collection = CollectionByAddress(token.address, network);
    return {
      id: token.id,
      address: token.address,
      collection: collection,
      name: collection ? collection.name(token.id) : 'INVALID',
      image: collection ? collection.image(token.id) : '#',
    };
  });
}

export async function getNFTs(address) {
  if (!address || address.indexOf('0x') !== 0) {
    return [];
  }

  const network = getNetworkName();
  if (network !== "Cronos") {
    return await getNFTsFromChain(address);
  }

  const resp = await fetch('https://wallet-nft-api-blush.vercel.app/api/wallet/' + address);
  const data = await resp.json();
  return convertTokens(data, network);
}

export async function getNFTsFromChain(address) {
  if (!address || address.indexOf('0x') !== 0) {
    return [];
  }

  const network = getNetworkName();
  const contracts = Collections.map(col => col.address(network));
  const tokenIdsByContract = await Promise.all(contracts.map(contractAddress => getRemoteTokens(contractAddress, address)));
  const tokens = contracts.flatMap((contractAddress, index) => tokenIdsByContract[index].tokens?.map(id => ({
    id,
    address: contractAddress,
  })));

  return convertTokens(tokens, network);
}

export default getNFTs;
