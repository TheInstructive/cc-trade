import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 5000) {
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

    return '0xe22f2cacf37b708f45a49b0cf5e24fa3ed635612';
  },

  name(id) {
    if (id === undefined) {
      return "First Frontier Land";
    }

    validateId(id);
    return "First Frontier Land #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xe22f2cacf37b708f45a49b0cf5e24fa3ed635612/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default FirstFrontierLand;
