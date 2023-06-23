import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 25000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const FirstFrontierLand = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xE22F2CACF37b708F45a49b0Cf5e24fA3eD635612';
  },

  name(id) {
    if (id === undefined) {
      return "Crypto.com Land - The First Frontier";
    }

    validateId(id);
    return "First Frontier Land #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xE22F2CACF37b708F45a49b0Cf5e24fA3eD635612/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default FirstFrontierLand;
