import Collections, { CollectionByAddress } from "./collections";
import { Contract } from "./WalletConnect";

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

export async function getNFTs(address, network) {
  const resp = await fetch('https://wallet-nft-api-blush.vercel.app/api/wallet/' + address);
  const data = await resp.json();
  return convertTokens(data, network);
}

export async function getNFTsFromChain(address, network) {
  const contracts = Collections.map(col => Contract(col.address(), [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
  ]));

  const balances = await Promise.all(contracts.map(contract => contract.read('balanceOf', [ address ])));
  const tokenIdsByContract = await Promise.all(contracts.map((contract, index) => contract.readMulti(
    new Array(balances[index]).fill(1).map((_, tokenIndex) => ([
      'tokenOfOwnerByIndex', [ address, tokenIndex ]
    ]))
  )));
  const tokens = contracts.flatMap((contract, index) => tokenIdsByContract[index].map(id => ({
    id,
    address: contract.address(),
  })));

  return convertTokens(tokens, network);
}

export default getNFTs;
