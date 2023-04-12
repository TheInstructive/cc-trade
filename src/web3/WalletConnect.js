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
  readContracts,
  erc721ABI
} from '@wagmi/core';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from "@web3modal/react";
import { publicProvider } from '@wagmi/core/providers/public';
import { BigNumber, utils } from 'ethers';

import { localNet, cronosMainnet, cronosTestnet } from "./Chains";
import Trader from "./trader/Contract";
import { CollectionByAddress } from "./collections";
import { Web3ClientError, returnError } from "./Error";


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

export function getNetworkName() {
  const { chain } = getNetwork();
  if (!chain) {
    throw new Web3ClientError("Not connected.");
  }
  return chain.name;
}


// Contract
export function Contract(contractAddress, abi) {
  const { isConnected, address } = getAccount();
  const { chain } = getNetwork();

  if (!isConnected || !address || !chain) {
    throw new Web3ClientError("Not connected.");
  }

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
        throw new Web3ClientError("Transaction failed.");
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

    async readMulti(params) {
      const result = await readContracts({
        contracts: params.map(x => ({
          address: contractAddress,
          abi,
          args: x[1],
          functionName: x[0],
        }))
      });
      return result;
    },

    userAddress() {
      return address;
    },

    network() {
      return chain.name;
    },

    address() {
      return contractAddress;
    },
  }
}

function TraderContract() {
  const network = getNetworkName();
  const contractAddress = Trader.address(network);
  const abi = Trader.abi(network);

  return Contract(contractAddress, abi);
}

function convertItem(network) {
  return (item) => {
    const { contractAddress, id } = item;
    const collection = CollectionByAddress(contractAddress, network);

    if (!collection) {
      throw new Web3ClientError(`Unknown NFT: ${contractAddress}/${id}`);
    }

    return {
      id,
      address: contractAddress,
      name: collection.name(id),
      image: collection.image(id),
      cronoscan: `https://cronoscan.com/token/${contractAddress}?a=${id}`,
    }
  }
}

async function requestApproval(address) {
  const config = await prepareWriteContract({
    address,
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    args: [ Trader.address(), true ],
    overrides: {
      from: getWalletAddress(),
    }
  });
  const { hash } = await writeContract(config);
  const txReceipt = await waitForTransaction({ hash });

  if (!txReceipt) {
    throw new Web3ClientError("Transaction failed.");
  }
}

async function missingApprovals(contract, tokens) {
  const contracts = tokens.reduce((ret, token) => {
    ret.push(token.contractAddress);
    return ret;
  }, new Set());
  const userAddress = contract.userAddress();
  const contractAddress = contract.address();
  const results = await readContracts({
    contracts: contracts.map(contract => ({
      address: contract.address,
      abi: erc721ABI,
      functionName: 'isApprovedForAll',
      args: [ userAddress, contractAddress ],
    })),
  });
  return results.map((ok, index) => ok && contracts[index]).filter(Boolean);
}

export async function getActiveOffers(page) {
  try {
    const contract = TraderContract();
    const address = contract.userAddress();

    const result = await contract.read('paginateOffers', [ address, page || 0, 10 ]);
    const offers = result.map(x => ({
      ...x.offer,
      id: x.id,
      index: x.index,
      items: x.tokens,
    }));

    // TODO mark invalid offers

    const itemConverter = convertItem(contract.network());

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
          have: offer.items.filter(item => item.have).map(itemConverter),
          want: offer.items.filter(item => !item.have).map(itemConverter),
        };
      }),
    }
  } catch (err) {
    return returnError(err);
  }
}

export async function createOffer(address, tokens) {
  try {
    const contract = TraderContract();

    const missing = await missingApprovals(contract, tokens.filter(token => token.have));
    const promises = missing.map(address => requestApproval(address));
    await Promise.all(promises);

    await contract.write('createOffer', [ address, tokens ], {
      value: utils.parseEther(Trader.payment(contract.network())),
    });
  } catch (err) {
    return returnError(err);
  }
}

export async function acceptOffer(id, index) {
  try {
    const contract = TraderContract();

    const tokens = await contract.read('offerTokens', [ id ]);
    const missing = await missingApprovals(contract, tokens.filter(token => !token.have));
    const promises = missing.map(address => requestApproval(address));
    await Promise.all(promises);

    await contract.write('acceptOffer', [ BigNumber.from(id), BigNumber.from(index) ], {
      value: utils.parseEther(Trader.payment(contract.network())),
    });
  } catch (err) {
    return returnError(err);
  }
}

export async function cancelOffer(id, index) {
  try {
    const contract = TraderContract();
    await contract.write('cancelOffer', [ BigNumber.from(id), BigNumber.from(index) ]);
  } catch (err) {
    return returnError(err);
  }
}
