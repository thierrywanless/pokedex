import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const requestSpriteFile = require.context(
  "pokemon-sprites/sprites/pokemon",
  false,
  /.png$/
);

const Pokemon = () => {
  const { id } = useParams();
  const image = requestSpriteFile(`./${id}.png`);

  const { isLoading, error, data } = useQuery(
    `pokemon/${id}`,
    () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
    { staleTime: 1200000 }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <div className="capitalize">{data.name}</div>
      <img src={image.default} alt={id} />
    </div>
  );
};

export default Pokemon;
