import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 6012) {
    throw new Web3ClientError('Invalid token id');
  }
}

const AtlantisPlanets = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0x3a19a693a29b43bae23f32b498d1a24d09f19878';
  },

  name(id) {
    if (id === undefined) {
      return "Atlantis Planets";
    }

    validateId(id);
    return "Atlantis Planets #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0x3a19a693a29b43bae23f32b498d1a24d09f19878/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default AtlantisPlanets;
