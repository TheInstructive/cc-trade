import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 5000) {
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

    return '0x89dbc8bd9a6037cbd6ec66c4bf4189c9747b1c56';
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
    return 'https://nft-cdn.cronos.club/0x89dbc8bd9a6037cbd6ec66c4bf4189c9747b1c56/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default MadMeerkatDegen;
