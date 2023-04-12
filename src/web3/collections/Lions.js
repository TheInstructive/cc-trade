import { Web3ClientError } from "../Error";

function validateId(id) {
  if (id < 1 || id > 10000) {
    throw new Web3ClientError('Invalid token id');
  }
}

const Lions = {
  address(network) {
    if (network === 'Private') {
      return '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0';
    }

    return '0xEa1635a0E9344d933DF42c0Fd494d39bcE865Dc4';
  },

  name(id) {
    validateId(id);
    return "Loaded Lion #" + id;
  },

  image(id) {
    validateId(id);
    return 'https://lions.cdn.cronos.club/'+id+'.png';
  }
};

export default Lions;
