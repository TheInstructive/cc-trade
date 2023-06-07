import { useState, createContext, useEffect } from 'react';
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
  erc721ABI,
  fetchEnsName,
  fetchEnsAddress,
  fetchBalance,
  switchNetwork,
  SwitchChainNotSupportedError,
} from '@wagmi/core';
import { EthereumClient, w3mConnectors } from '@web3modal/ethereum';
import { Web3Modal } from "@web3modal/react";
import { publicProvider } from '@wagmi/core/providers/public';
import { BigNumber, utils, constants } from 'ethers';

import { localNet, cronosMainnet, cronosTestnet } from "./Chains";
import { RockXProvider, VVSProvider } from "./RPC";
import Trader from "./trader/Contract";
import { CollectionByAddress } from "./collections";
import { Web3ClientError, returnError } from "./Error";
import Collections from './collections';
import { convertLink } from './Inventory';


const IS_DEVELOPMENT_ENV = process?.env?.NODE_ENV === 'development';
const projectId = "c78c83145ebe7bdde30d318b1e15be49";

const chains = IS_DEVELOPMENT_ENV ? [cronosMainnet, cronosTestnet, localNet] : [cronosMainnet, cronosTestnet];
const providers = IS_DEVELOPMENT_ENV ? [
  publicProvider(),
] : [
  publicProvider(),
  RockXProvider(),
  VVSProvider(),
];


// setup
const { provider } = configureChains(chains, providers);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);
let pendingSwitchPromise = null;

export const web3Modal = <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />;
export { useWeb3Modal } from "@web3modal/react";

async function autoSwitchNetwork() {
  const { chain } = getNetwork();
  if (!chain) {
    return;
  }

  const available = chains.map(chain => chain.name);
  if (available.includes(chain.name)) {
    return;
  }

  if (pendingSwitchPromise) {
    await pendingSwitchPromise;
  }

  let resolver, rejecter;
  pendingSwitchPromise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });

  try {
    await switchNetwork({
      chainId: chains[0].id,
    });
  } catch (err) {
    pendingSwitchPromise = null;
    rejecter(err);

    if (err instanceof SwitchChainNotSupportedError) {
      throw new Web3ClientError("Please, switch to Cronos network on your wallet.");
    }

    throw err;
  }

  pendingSwitchPromise = null;
  resolver();
}

export function getWalletAddress() {
  const { address } = getAccount();
  return address;
}

export function isWalletConnected() {
  const { isConnected } = getAccount();
  return isConnected;
}

export function getNetworkName() {
  const { chain } = getNetwork();
  if (!chain) {
    throw new Web3ClientError("Not connected.");
  }
  return chain.name;
}

export async function getWalletName() {
  const address = getWalletAddress();
  try {
    const { name } = await getCronosID({ address });
    return name || address;
  } catch (err) {
    console.error("Error while loading cronos.id", err);
  }
  return address;
}

export const WalletContext = createContext({
  address: null,
  isConnected: false,
  network: null,
});

export function WalletProvider(props) {
  const [address, setAddress] = useState(null);
  const [isConnected, setConnected] = useState(false);
  const [network, setNetwork] = useState(null);

  function update() {
    const account = getAccount();
    const { chain } = getNetwork();

    setAddress(account.address);
    setConnected(account.isConnected);
    setNetwork(chain);
  }

  useEffect(() => {
    update();
    watchAccount(update);
  }, []);

  return (
    <WalletContext.Provider value={{
      address, isConnected, network,
    }}>
      {props.children}
    </WalletContext.Provider>
  );
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
      if (overrides && overrides.value) {
        const balance = await fetchBalance({ address });

        if (balance.value.lt(overrides.value)) {
          throw new Web3ClientError("Insufficient balance for transaction.");
        }
      }

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
        overrides: {
          from: address,
        },
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
      links: collection.links(id).map(link => convertLink(link, { id, address: contractAddress })),
    }
  }
}

async function setApprovalForAll(address, yes) {
  const config = await prepareWriteContract({
    address,
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    args: [ Trader.address(getNetworkName()), yes ],
    overrides: {
      from: getWalletAddress(),
    }
  });
  const { hash } = await writeContract(config);
  const txReceipt = await waitForTransaction({ hash });

  if (!txReceipt) {
    throw new Web3ClientError("Transaction failed.");
  }
  return {};
}

async function approve(address, tokenID, yes) {
  const spender = yes ? Trader.address(getNetworkName()) : constants.AddressZero;
  const config = await prepareWriteContract({
    address,
    abi: erc721ABI,
    functionName: 'approve',
    args: [ spender, BigNumber.from(tokenID) ],
    overrides: {
      from: getWalletAddress(),
    }
  });
  const { hash } = await writeContract(config);
  const txReceipt = await waitForTransaction({ hash });

  if (!txReceipt) {
    throw new Web3ClientError("Transaction failed.");
  }
  return {};
}

export async function requestApproval(token, forAll) {
  try {
    const address = token.collection.address(getNetworkName());

    if (forAll) {
      return await setApprovalForAll(address, true);
    }

    return await approve(address, token.id, true);
  } catch (err) {
    return returnError(err);
  }
}

export async function revokeApproval(token, forAll) {
  try {
    const contractAddress = Trader.address(getNetworkName());
    const address = token.collection.address(getNetworkName());

    if (forAll) {
      const isApprovedForAll = await readContract({
        address,
        abi: erc721ABI,
        functionName: 'isApprovedForAll',
        args: [ getWalletAddress(), contractAddress ],
      });

      if (!isApprovedForAll) {
        throw new Web3ClientError("Trader contract doesn't have approval for \"" + token.collection.name() + "\" collection.");
      }

      return await setApprovalForAll(address, false);
    }

    const approvedAddress = await readContract({
      address,
      abi: erc721ABI,
      functionName: 'getApproved',
      args: [ BigNumber.from(token.id) ],
    });

    if (approvedAddress !== contractAddress) {
      throw new Web3ClientError("Trader contract doesn't have approval to revoke for \"" + token.name + "\".");
    }

    return await approve(address, token.id, false);
  } catch (err) {
    return returnError(err);
  }
}

export async function checkApprovals() {
  try {
    const network = getNetworkName();
    const trader = TraderContract();
    const results = await trader.read("checkApprovals", [Collections.map(col => col.address(network))]);

    if (!results) {
      return Collections.map(collection => ({
        collection,
        approved: false,
      }));
    }

    return {
      approvals: Collections.map((collection, i) => ({
        collection,
        approved: results[i],
      })),
    }
  } catch (err) {
    return returnError(err);
  }
}

async function missingApprovals(contract, tokens) {
  const contracts = [...tokens.reduce((ret, token) => {
    ret.add(token.contractAddress);
    return ret;
  }, new Set())];

  if (!contracts.length) {
    return [];
  }

  const userAddress = contract.userAddress();
  const operatorAddress = contract.address();
  const results = await readContracts({
    contracts: contracts.map(contractAddress => ({
      address: contractAddress,
      abi: erc721ABI,
      functionName: 'isApprovedForAll',
      args: [ userAddress, operatorAddress ],
    })),
  });

  // collection level missing approvals
  const missing = results.map((ok, index) => !ok && contracts[index]).filter(Boolean);

  // token level missing approvals
  const missingTokens = missing.map(contractAddress => tokens.filter(token => token.contractAddress === contractAddress)).flat();
  if (!missingTokens.length) {
    return [];
  }

  const approvedTo = await readContracts({
    contracts: missingTokens.map(token => ({
      address: token.contractAddress,
      abi: erc721ABI,
      functionName: 'getApproved',
      args: [ BigNumber.from(token.id) ],
    })),
  });

  return approvedTo.map((address, index) => address === operatorAddress ? null : missingTokens[index]).filter(x => x !== null);
}

export async function getRemoteTokens(contractAddress, address) {
  try {
    await autoSwitchNetwork();

    const contract = TraderContract();
    const result = await contract.read('getRemoteTokens', [ contractAddress, address ]);

    return {
      tokens: result.map(x => BigNumber.from(x)),
    }
  } catch (err) {
    return returnError(err);
  }
}

export async function getCronosID({ name, address }) {
  await autoSwitchNetwork();

  try {
    if (address) {
      const name = await fetchEnsName({ address });
  
      return {
        name,
        address,
      };
    }
  
    if (name) {
      const address = await fetchEnsAddress({ name });
  
      return {
        name,
        address,
      };
    }
  } catch (err) {
    if (err.reason === "network does not support ENS") {
      console.warn("Network doesn't support ENS");
    } else {
      console.error("Error while fetching wallet details", err);
    }
  }

  return {
    name,
    address,
  }
}

export async function getActiveOffers(page) {
  try {
    await autoSwitchNetwork();

    const contract = TraderContract();
    const address = contract.userAddress();

    const result = await contract.read('paginateOffers', [ address, page || 0, 10 ]);
    const offers = result.map(x => ({
      ...x.offer,
      id: x.id,
      index: x.index,
      items: x.tokens,
    }));

    const isValid = await contract.readMulti(offers.map(offer => ['validateOffer', [ offer.id ]]));
    const itemConverter = convertItem(contract.network());

    return {
      offers: offers.map((offer, index) => {
        const received = offer.toAddress === address;
        const otherAddress = received ? offer.fromAddress : offer.toAddress;

        return {
          id: offer.id,
          index: offer.index,
          invalid: !isValid[index],
          received,
          address: otherAddress,
          have: offer.items.filter(item => item.have).map(itemConverter),
          want: offer.items.filter(item => !item.have).map(itemConverter),
        };
      }),
    }
  } catch (err) {
    return returnError(err);
  }
}

export async function getMissingApprovals(options) {
  try {
    await autoSwitchNetwork();

    const { have } = options;
    const contract = TraderContract();

    const tokens = options.tokens || await contract.read('getOfferTokens', [ options.id ]);
    const missing = await missingApprovals(contract, tokens.filter(token => have ? token.have : !token.have));

    return {
      missing: missing.map(token => ({
        ...token,
        collection: CollectionByAddress(token.contractAddress, getNetworkName()),
        name() {
          return this.collection.name(this.id);
        },
        image() {
          return this.collection.image(this.id);
        },
      })),
    }
  } catch (err) {
    return returnError(err);
  }
}

export async function createOffer(address, tokens) {
  try {
    await autoSwitchNetwork();

    const contract = TraderContract();
    await contract.write('createOffer', [ address, tokens ], {
      value: utils.parseEther(Trader.payment(contract.network())),
    });
    return {};
  } catch (err) {
    return returnError(err);
  }
}

export async function acceptOffer(id, index) {
  try {
    await autoSwitchNetwork();

    const contract = TraderContract();

    await contract.write('acceptOffer', [ BigNumber.from(id), BigNumber.from(index) ], {
      value: utils.parseEther(Trader.payment(contract.network())),
    });
    return {};
  } catch (err) {
    return returnError(err);
  }
}

export async function cancelOffer(id, index) {
  try {
    await autoSwitchNetwork();

    const contract = TraderContract();
    await contract.write('cancelOffer', [ BigNumber.from(id), BigNumber.from(index) ]);
    return {};
  } catch (err) {
    return returnError(err);
  }
}
