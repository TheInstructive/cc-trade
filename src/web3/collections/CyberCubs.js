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

    return '0xe3d53fb80c8cda7bb9b7207cb6b186172bd323cf';
  },

  name(id) {
    if (id === undefined) {
      return "Cyber Cub";
    }

    validateId(id);
    return "Cyber Cub #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xe3d53fb80c8cda7bb9b7207cb6b186172bd323cf/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default CyberCubs;
