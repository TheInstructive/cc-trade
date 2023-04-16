import abi from './abi.json'
import { Web3ClientError } from "../Error";

const Trader = {
  address(network) {
    if (network === "Private") {
      return '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    }
  
    if (network === "Cronos Testnet") {
      return '0x5bE3Cf8f2994A4b0AA445d54C7D52f92db8aF2b3';
    }
  
    if (network === "Cronos") {
      return '0x0';
    }
  
    throw new Web3ClientError("Wrong network!");
  },

  abi(network) {
    return abi;
  },

  payment(network) {
    return "5.0";
  },
}

export default Trader;
