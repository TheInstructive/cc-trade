import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 50000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const CDCExpeditionGear = {
  address(network) {
    if (network === "Private") {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xaE50f345502aD3395DB0099d38692f609F829B58';
  },

  name(id) {
    if (id === undefined) {
      return "Crypto.com Expedition Gear";
    }

    validateId(id);
    return "Expedition Backpack #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xaE50f345502aD3395DB0099d38692f609F829B58/'+id;
  },

  links() {
    return ['nftscan', 'minted'];
  },
};

export default CDCExpeditionGear;
