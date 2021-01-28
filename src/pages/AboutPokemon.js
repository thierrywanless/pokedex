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
    { staleTime: 1200000 }
  );

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error !== null ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div className="capitalize">{data.name}</div>
          <img src={image} alt={id} />
        </>
      )}
    </div>
  );
};

export default Pokemon;
