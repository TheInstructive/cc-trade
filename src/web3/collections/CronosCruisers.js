import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 8000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const CronosCruisers = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xd25358e2cad3e1fd165887569892a99fffa674ac';
  },

  name(id) {
    if (id === undefined) {
      return "Cruiser";
    }

    validateId(id);
    return "Cruiser #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xd25358e2cad3e1fd165887569892a99fffa674ac/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default CronosCruisers;
