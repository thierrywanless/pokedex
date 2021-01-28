// Provides webpack context for local pokemon sprites
const SpriteContext = require.context(
  "pokemon-sprites/sprites/pokemon",
  false,
  /.png$/
);

/**
 * Gets the sprite for a given pokemon id
 *
 * @param {number} pokemonId
 */
export const getSprite = (pokemonId) => {
  try {
    return SpriteContext(`./${pokemonId}.png`).default;
  } catch (error) {
    return null;
  }
};
