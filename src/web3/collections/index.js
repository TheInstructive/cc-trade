import BabyAliens from "./AfeBabyAliens";
import Ballies from "./Ballies";
import BalliesGear from "./BalliesGear";
import Lions from "./Lions";
import Argonauts from "./Argonauts";
import AtlantisPlanets from "./AtlantisPlanets";
import CDCExpeditionGear from "./CDCExpeditionGear";
import CronosCruisers from "./CronosCruisers";
import CroSkull from "./CroSkull";
import CyberCubs from "./CyberCubs";
import FirstFrontierLand from "./FirstFrontierLand";
import MadMeerkat from "./MadMeerkat";
import MadMeerkatDegen from "./MadMeerkatDegen";
import MadSacks from "./MadSacks";
import MMTreehouse from "./MMTreehouse";
import VVSMinerMole from "./VVSMinerMole";
import BalliesCheerleaders from "./BalliesCheerleaders";
import DiamondCoins from "./DiamondCoins";

const Collections = [
  BabyAliens,
  Ballies,
  BalliesGear,
  Lions,
  Argonauts,
  AtlantisPlanets,
  CDCExpeditionGear,
  CronosCruisers,
  CroSkull,
  CyberCubs,
  FirstFrontierLand,
  MadMeerkat,
  MadMeerkatDegen,
  MadSacks,
  MMTreehouse,
  VVSMinerMole,
  BalliesCheerleaders,
  DiamondCoins,
];

export default Collections;

export function CollectionByAddress(address, network) {
  return Collections.filter(col => col.address(network).toUpperCase() === address.toUpperCase())[0];
}