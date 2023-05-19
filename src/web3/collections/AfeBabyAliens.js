import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 5000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const BabyAliens = {
  address(network) {
    if (network === "Private") {
      return '0x0';
    }

    if (network === 'Cronos Testnet') {
      return '0x525b880227b7720DC5D4646D6713ce9EC12b9bB4';
    }

    return '0xF4a27cb06141c74638b861cD75Ef7237401ad345';
  },

  name(id) {
    if (id === undefined) {
      return "AFE: Baby Alien";
    }

    validateId(id);
    return "AFE: Baby Alien #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://metadata.aliensfromearth.com/babyaliens/'+id+'.png';
  }
};

export default BabyAliens;
