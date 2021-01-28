import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const Home = () => {
  const { isLoading, error, data } = useQuery(
    "pokemonData",
    () =>
      fetch("https://pokeapi.co/api/v2/pokemon?offset=0")
        .then((res) => res.json())
        .then((data) => {
          const results = data.results.map((pokemon, index) => {
            return { ...pokemon, id: index + 1 };
          });

          return { ...data, results };
        }),
    { staleTime: 3600000 }
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      {data &&
        data.results.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.id}`}>
                {pokemon.id}: {pokemon.name}
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
