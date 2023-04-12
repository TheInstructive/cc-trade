import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 9999) {
    throw new Web3ClientError('Invalid token id');
  }
}

const Ballies = {
  address(network) {
    if (network === 'Private') {
      return '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    }

    return '0xF12B07570804c56B4ce8f63e7121BEC8C7CA1542';
  },

  name(id) {
    validateId(id);
    return "Ballie #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://ballies.cdn.cronos.club/'+id+'.png';
  }
};

export default Ballies;
