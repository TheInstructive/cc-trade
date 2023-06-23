import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 40943) {
    throw new Web3ClientError('Invalid token id');
  }
}

const MadSacks = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0x23721073592FB452C556fB9322bA4dF6A6675050';
  },

  name(id) {
    if (id === undefined) {
      return "Mad Sacks";
    }

    validateId(id);
    return "Mad Meerkat Equipment #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0x23721073592FB452C556fB9322bA4dF6A6675050/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default MadSacks;
