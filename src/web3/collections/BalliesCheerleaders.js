import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 3333) {
    throw new Web3ClientError('Invalid token id');
  }
}

const BalliesCheerleaders = {
  address(network) {
    if (network === 'Private') {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0x9e38e9fe0b613be34f1826a5a3d63d9759d29873';
  },

  name(id) {
    if (id === undefined) {
      return "Ballies Cheerleader";
    }

    validateId(id);
    return "Ballies Cheerleader #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0x9e38e9fe0b613be34f1826a5a3d63d9759d29873/'+id+'';
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default BalliesCheerleaders;
