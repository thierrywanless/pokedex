import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { getSprite } from "../helpers/SpriteHelpers";
import { getColorForType } from "../helpers/ColorHelpers";

/**
 * Renders a pokemon for the PokeDex list
 *
 * @param {pokemon} pokemon - { name, url, id }
 */
const Pokemon = ({ pokemon }) => {
  const {
    isLoading,
    error,
    data,
    isFetching,
  } = useQuery(
    `pokemon/${pokemon.id}`,
    () => fetch(pokemon.url).then((res) => res.json()),
    { staleTime: 86400000 }
  );

  // Output nothing while waiting for data - if error ignore
  if (isLoading || isFetching || error) return <></>;

  // Get pokemon specific color and image
  const sprite = getSprite(data.id);
  let color = "white";
  if (data.types) {
    color = getColorForType(data.types[0].type);
  }

  return (
    <>
      {sprite && (
        <div
          className={`p-4 pt-8 relative rounded-2xl bg-${color} transition duration-500 ease-out transform hover:-translate-y-1 hover:scale-110`}
        >
          <Link
            to={`/pokemon/${data.id}`}
            className="flex flex-col justify-center"
          >
            <span className="absolute top-0 left-0 pl-3 pr-3 pt-1 pb-1 text-base rounded-br-2xl rounded-tl-2xl bg-cream border-r-2 border-b-2">
              #{data.id}
            </span>
            <img src={sprite} alt={data.name} />
            <p className="capitalize text-white text-lg text-center">
              {data.name}
            </p>
          </Link>
        </div>
      )}
    </>
  );
};

export default Pokemon;
