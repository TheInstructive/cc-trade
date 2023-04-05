import { CollectionByAddress } from "./collections";

async function getNFTs(address) {
  const resp = await fetch('https://wallet-nft-api-blush.vercel.app/api/wallet/' + address);
  const data = await resp.json();

  const tokens = data.map(token => {
    const collection = CollectionByAddress(token.address);
    return {
      id: token.id,
      address: token.address,
      collection: collection,
      name: collection.name(token.id),
      image: collection.image(token.id),
    };
  });

  return tokens;
}

export default getNFTs;
