import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 10000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const MadMeerkatDegen = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xA19bFcE9BaF34b92923b71D487db9D0D051a88F8';
  },

  name(id) {
    if (id === undefined) {
      return "Mad Meerkat Degen";
    }

    validateId(id);
    return "Mad Meerkat Degen #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xA19bFcE9BaF34b92923b71D487db9D0D051a88F8/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default MadMeerkatDegen;
