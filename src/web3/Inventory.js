import Collections, { CollectionByAddress } from "./collections";
import { getNetworkName, getRemoteTokens } from "./WalletConnect";

export function convertLink(name, token) {
  let url = '#';
  let title = '-';

  if (name === 'nftscan') {
    url = `https://cronos.nftscan.com/${token.address}/${token.id}`;
    title = 'NFTScan';
  }
  else if (name === 'minted') {
    url = `https://minted.network/collections/cronos/${token.address}/${token.id}`;
    title = 'Minted';
  }
  else if (name === 'ebisusbay') {
    url = `https://app.ebisusbay.com/collection/${token.address}/${token.id}`;
    title = 'Ebisu\'s Bay';
  }

  return {
    name,
    url,
    title,
  };
}

function convertTokens(tokens, network) {
  return tokens.map((token, index) => {
    const collection = CollectionByAddress(token.address, network);
    return {
      index,
      id: token.id,
      address: token.address,
      collection: collection,
      name: collection ? collection.name(token.id) : 'INVALID',
      image: collection ? collection.image(token.id) : '#',
      links: collection ? collection.links().map(name => convertLink(name, token)) : [],
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

  try {
    const resp = await fetch('https://wallet-nft-api-blush.vercel.app/api/wallet/' + address);
    const data = await resp.json();
    return convertTokens(data, network);
  } catch (err) {
    console.error("Inventory fetch error", err);
    return await getNFTsFromChain(address);
  }
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
