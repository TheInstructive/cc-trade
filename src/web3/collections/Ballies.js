
function validateId(id) {
  if (id < 1 || id > 9999) {
    throw new Error('Invalid token id');
  }
}

const Ballies = {
  address() {
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
