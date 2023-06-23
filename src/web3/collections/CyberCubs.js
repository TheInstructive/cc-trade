import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 10000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const CyberCubs = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xE3D53fb80c8Cda7Bb9B7207cb6B186172BD323cf';
  },

  name(id) {
    if (id === undefined) {
      return "Cyber Cubs";
    }

    validateId(id);
    return "Cyber Cub #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xE3D53fb80c8Cda7Bb9B7207cb6B186172BD323cf/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default CyberCubs;
