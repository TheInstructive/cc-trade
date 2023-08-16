import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 1000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const DiamondCoins = {
  address(network) {
    if (network === 'Private') {
      return '';
    }

    if (network === 'Cronos Testnet') {
      return '';
    }

    return '0xA86f74B47F1193d9d6DBe4029cAf4A2056607D7C';
  },

  name(id) {
    if (id === undefined) {
      return "Diamond Coins Of The Grind Guild";
    }

    validateId(id);
    return "Diamond Coins Of The Grind Guild #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://nft-cdn.cronos.club/0xA86f74B47F1193d9d6DBe4029cAf4A2056607D7C/'+id+'';
  },

  links() {
    return ['nftscan', 'minted', 'ebisusbay'];
  },
};

export default DiamondCoins;
