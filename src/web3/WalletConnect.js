import {
  configureChains,
  createClient,
  watchAccount,
  getNetwork,
  getAccount,
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  readContract,
} from '@wagmi/core';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from "@web3modal/react";
import { publicProvider } from '@wagmi/core/providers/public';
import { BigNumber, utils } from 'ethers';

import { localNet, cronosMainnet, cronosTestnet } from "./Chains";
import Trader from "./trader/Contract";
import { CollectionByAddress } from "./collections";


const chains = [localNet, cronosMainnet, cronosTestnet];
const projectId = "c78c83145ebe7bdde30d318b1e15be49";


// setup
const { provider } = configureChains(chains, [
  publicProvider(),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export const web3Modal = <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />;
export { useWeb3Modal } from "@web3modal/react";

export function getWalletAddress() {
  const { address } = getAccount();
  return address;
}

export function isWalletConnected() {
  const { isConnected } = getAccount();
  return isConnected;
}

export function onWalletChange(callback) {
  return watchAccount(callback);
};


// Trader Contract
function TraderContract() {
  const { isConnected, address } = getAccount();
  const { chain } = getNetwork();

  if (!isConnected || !address || !chain) {
    throw new Error("Not connected.");
  }

  const contractAddress = Trader.address(chain.name);
  const abi = Trader.abi(chain.name);

  return {
    async write(functionName, args, overrides) {
      const config = await prepareWriteContract({
        address: contractAddress,
        abi,
        functionName,
        args,
        overrides: {
          ...(overrides || {}),
          from: address,
        }
      });
      const { hash } = await writeContract(config);
      const txReceipt = await waitForTransaction({ hash });

      if (!txReceipt) {
        throw new Error("Transaction failed.");
      }
    },

    async read(functionName, args) {
      const result = await readContract({
        address: contractAddress,
        abi,
        args,
        functionName,
      });
      return result;
    },

    userAddress() {
      return address;
    },

    network() {
      return chain.name;
    },
  }
}

function convertItem(address, id) {
  const collection = CollectionByAddress(address);

  if (!collection) {
    throw new Error(`Unknown NFT: ${address}/${id}`);
  }

  return {
    address,
    id,
    name: collection.name(id),
    image: collection.image(id),
    cronoscan: `https://cronoscan.com/token/${address}?a=${id}`,
  }
}

export async function getActiveOffers() {
  try {
    const contract = TraderContract();
    const address = contract.userAddress();

    const offerCount = await contract.read('activeOffersCount', [ address ]);
    const offers = [];

    // TODO paginate offers

    for (let index = 0; index < offerCount; index ++) {
      const offerId = await contract.read('activeOffers', [ address, index ]);
      const details = await contract.read('offers', [ offerId ]);

      const itemsCount = await contract.read('offerItemsCount', [ offerId ]);
      const items = [];

      for (let itemIndex = 0; itemIndex < itemsCount; itemIndex ++) {
        const item = await contract.read('offerItems', [ offerId, itemIndex ]);
        items.push(item);
      }
  
      offers.push({
        ...details,
        id: offerId,
        index,
        items,
      });
    }

    // TODO mark invalid offers

    return {
      offers: offers.map((offer) => {
        const received = offer.toAddress === address;
        const otherAddress = received ? offer.fromAddress : offer.toAddress;

        return {
          id: offer.id,
          index: offer.index,
          received,
          address: otherAddress,
          name: otherAddress,
          have: offer.items.filter(item => item.have).map(convertItem),
          want: offer.items.filter(item => !item.have).map(convertItem),
        };
      }),
    }
  } catch (err) {
    return {
      error: err.message,
    };
  }
}
export async function createOffer(address, tokens) {
  try {
    const contract = TraderContract();
    await contract.write('createOffer',[ address, tokens ], {
      value: utils.parseEther(Trader.payment(contract.network())),
    });
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

export async function acceptOffer(id, index) {
  try {
    const contract = TraderContract();
    await contract.write('acceptOffer', [ BigNumber.from(id), BigNumber.from(index) ], {
      value: utils.parseEther(Trader.payment(contract.network())),
    });
  } catch (err) {
    return {
      error: err.message,
    };
  }
}

export async function cancelOffer(id, index) {
  try {
    const contract = TraderContract();
    await contract.write('cancelOffer', [ BigNumber.from(id), BigNumber.from(index) ]);
  } catch (err) {
    return {
      error: err.message,
    };
  }
}
