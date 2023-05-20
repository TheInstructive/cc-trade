import abi from './abi.json'
import { Web3ClientError } from "../Error";

const Trader = {
  address(network) {
    if (network === "Private") {
      return '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    }
  
    if (network === "Cronos Testnet") {
      return '0xe9023E85bD9f64e1f61401b989E62E12BaD18f56';
    }
  
    if (network === "Cronos") {
      return '0x83C4862E3e65902308d11aC829D655C1775556f7';
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
