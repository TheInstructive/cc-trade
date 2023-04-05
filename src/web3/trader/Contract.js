import abi from './abi.json'

const Trader = {
  address(network) {
    if (network === "Private") {
      return '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    }
  
    if (network === "Cronos Testnet") {
      return '0x0';
    }
  
    if (network === "Cronos") {
      return '0x0';
    }
  
    throw new Error("Wrong network!");
  },

  abi(network) {
    return abi;
  }
}

export default Trader;
