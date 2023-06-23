import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 5000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const MMTreehouse = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xdc5bbdb4a4b051bdb85b959eb3cbd1c8c0d0c105';
  },

  name(id) {
    if (id === undefined) {
      return "Mad Meerkat Treehouse";
    }

    validateId(id);
    return "Mad Meerkat Treehouse #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xdc5bbdb4a4b051bdb85b959eb3cbd1c8c0d0c105/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default MMTreehouse;
