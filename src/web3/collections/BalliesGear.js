import names from './BalliesGearNames.json';
import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 9999) {
    throw new Web3ClientError('Invalid token id');
  }
}

const BalliesGear = {
  address(network) {
    if (network === "Private") {
      return '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';
    }

    if (network === 'Cronos Testnet') {
      return '0xe6cCbf40C2A1B9815ca189e6cad9B96C1292112a';
    }

    return '0x861C150f818A882AAA3aFA91694Fc9a6C5CCcA1C';
  },

  name(id) {
    validateId(id);
    return names[id - 1];
  },

  image(id) {
    validateId(id);
    return 'https://ballies.cdn.cronos.club/gear/'+id+'.png';
  }
};

export default BalliesGear;
