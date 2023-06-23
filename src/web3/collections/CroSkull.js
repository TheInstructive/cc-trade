import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 6666) {
    throw new Web3ClientError('Invalid token id');
  }
}

const CroSkull = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xf87a517a5caecaa03d7cca770789bdb61e09e05f';
  },

  name(id) {
    if (id === undefined) {
      return "CroSkulls";
    }

    validateId(id);
    return "CroSkulls #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xf87a517a5caecaa03d7cca770789bdb61e09e05f/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default CroSkull;
