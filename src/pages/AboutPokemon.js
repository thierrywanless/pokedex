import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getSprite } from "../helpers/SpriteHelpers";

const Pokemon = () => {
  const { id } = useParams();
  const image = getSprite(id);

  const { isLoading, error, data } = useQuery(
    `pokemon/${id}`,
    () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
    { staleTime: 86400000 }
  );

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error !== null ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="flex flex-col content-center items-center pt-10 relative">
          <div className="absolute top-0 left-0 pl-3 pr-3 pt-1 pb-1 rounded-br-2xl bg-cream border-r-2 border-b-2">
            <p className="text-3xl text-white">#{data.id}</p>
          </div>
          <h1 className="capitalize text-white text-4xl">{data.name}</h1>
          <img src={image} alt={id} />
        </div>
      )}
    </div>
  );
};

export default Pokemon;
