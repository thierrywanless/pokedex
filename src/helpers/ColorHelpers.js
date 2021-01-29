import Colors from "../styles/colors";

/**
 * Provides the color className for tailwind color class
 *
 * @param {type} type - Pokemon type { name, url }
 */
export const getColorForType = (type) => {
  switch (type.name) {
    case "normal":
      return getPropName(Colors, Colors.normalType);
    case "fire":
      return getPropName(Colors, Colors.fireType);
    case "water":
      return getPropName(Colors, Colors.waterType);
    case "grass":
      return getPropName(Colors, Colors.grassType);
    case "electric":
      return getPropName(Colors, Colors.electricType);
    case "ice":
      return getPropName(Colors, Colors.iceType);
    case "fighting":
      return getPropName(Colors, Colors.fightingType);
    case "poison":
      return getPropName(Colors, Colors.poisonType);
    case "ground":
      return getPropName(Colors, Colors.groundType);
    case "flying":
      return getPropName(Colors, Colors.flyingType);
    case "psychic":
      return getPropName(Colors, Colors.psychicType);
    case "bug":
      return getPropName(Colors, Colors.bugType);
    case "rock":
      return getPropName(Colors, Colors.rockType);
    case "ghost":
      return getPropName(Colors, Colors.ghostType);
    case "dark":
      return getPropName(Colors, Colors.darkType);
    case "dragon":
      return getPropName(Colors, Colors.dragonType);
    case "steel":
      return getPropName(Colors, Colors.steelType);
    case "fairy":
      return getPropName(Colors, Colors.fairyType);
    default:
      throw new Error(`Pokemon type not configured: ${type}`);
  }
};

// Gets a property name from an object
const getPropName = (obj, type) =>
  Object.keys(obj).find((key) => obj[key] === type);
