import BabyAliens from "./AfeBabyAliens";
import Ballies from "./Ballies";
import BalliesGear from "./BalliesGear";
import Lions from "./Lions";

const Collections = [
  BabyAliens,
  Ballies,
  BalliesGear,
  Lions,
];

export default Collections;

export function CollectionByAddress(address, network) {
  return Collections.filter(col => col.address(network).toUpperCase() === address.toUpperCase())[0];
}
