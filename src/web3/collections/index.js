
import Ballies from "./Ballies";
import BalliesGear from "./BalliesGear";
import Lions from "./Lions";

const Collections = [
  Ballies,
  BalliesGear,
  Lions,
];

export default Collections;

export function CollectionByAddress(address, network) {
  return Collections.filter(col => col.address(network).toUpperCase() === address.toUpperCase())[0];
}
