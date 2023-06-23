import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 5000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const Argonauts = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xa996ad2b9f240f78b063e47f552037658c4563d1';
  },

  name(id) {
    if (id === undefined) {
      return "Argonauts";
    }

    validateId(id);
    return "Argonauts #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xa996ad2b9f240f78b063e47f552037658c4563d1/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default Argonauts;
