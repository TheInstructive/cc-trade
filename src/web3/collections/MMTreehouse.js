import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 10000) {
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

    return '0xDC5bBDb4A4b051BDB85B959eB3cBD1c8C0d0c105';
  },

  name(id) {
    if (id === undefined) {
      return "MM Treehouse";
    }

    validateId(id);
    return "Mad Meerkat Treehouse #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xDC5bBDb4A4b051BDB85B959eB3cBD1c8C0d0c105/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default MMTreehouse;
