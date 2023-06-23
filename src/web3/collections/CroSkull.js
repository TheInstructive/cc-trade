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

    return '0xF87A517A5CaecaA03d7cCa770789BdB61e09e05F';
  },

  name(id) {
    if (id === undefined) {
      return "CroSkull Originals";
    }

    validateId(id);
    return "CroSkulls #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xF87A517A5CaecaA03d7cCa770789BdB61e09e05F/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default CroSkull;
