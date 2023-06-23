import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 5000) {
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

    return '0xae50f345502ad3395db0099d38692f609f829b58';
  },

  name(id) {
    if (id === undefined) {
      return "Expedition Backpack";
    }

    validateId(id);
    return "Expedition Backpack #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xae50f345502ad3395db0099d38692f609f829b58/'+id;
  },

  links() {
    return ['nftscan', 'minted'];
  },
};

export default CDCExpeditionGear;
