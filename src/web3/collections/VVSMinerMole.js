import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 10000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const VVSMinerMole = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0x06596ed89ac4609de47a21af7e36b38b2df57c26';
  },

  name(id) {
    if (id === undefined) {
      return "VVS Miner Mole";
    }

    validateId(id);
    return "VVS Miner Mole #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0x06596ed89ac4609de47a21af7e36b38b2df57c26/'+id;
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default VVSMinerMole;
