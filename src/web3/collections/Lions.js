
function validateId(id) {
  if (id < 1 || id > 10000) {
    throw new Error('Invalid token id');
  }
}

const Lions = {
  address() {
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
