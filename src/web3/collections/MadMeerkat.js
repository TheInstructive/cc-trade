import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 10000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const MadMeerkat = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0x89dBC8Bd9a6037Cbd6EC66C4bF4189c9747B1C56';
  },

  name(id) {
    if (id === undefined) {
      return "Mad Meerkat";
    }

    validateId(id);
    return "Mad Meerkat: #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0x89dBC8Bd9a6037Cbd6EC66C4bF4189c9747B1C56/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default MadMeerkat;
