import React from "react";
import { Link } from "react-router-dom";

import { getSprite } from "../helpers/SpriteHelpers";

/**
 * Renders a pokemon for the PokeDex list
 *
 * @param {pokemon} pokemon
 */
const Pokemon = ({ pokemon }) => {
  const sprite = getSprite(pokemon.id);

  return (
    <>
      {sprite && (
        <Link to={`/pokemon/${pokemon.id}`}>
          <p key={pokemon.id}>
            {pokemon.id}: {pokemon.name}
            <img src={sprite} alt={pokemon.name} />
          </p>
        </Link>
      )}
    </>
  );
};

export default Pokemon;
