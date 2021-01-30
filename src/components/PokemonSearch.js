import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import Pokemon from "../components/Pokemon";

/**
 * Renders a list of pokemon according to the search query supplied
 *
 * @param {string} search
 */
const PokemonSearch = ({ search }) => {
  const [pokemon, setPokemon] = useState([]);

  // PokeAPI does not support search currently - Get all results and filter by search query manually
  const fetchPokemonSearch = () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=9999`)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((pokemon) => {
          // PokeAPI does not provide pokemon id as part of response - extract from url
          const pokemonIdRegex = /\/pokemon\/(\d+)/;
          const match = pokemonIdRegex.exec(pokemon.url);
          const pokemonId = Number(match[1]);

          return { ...pokemon, id: pokemonId };
        });

        return { ...data, results };
      });
  };

  const { isLoading, error, data, isFetching } = useQuery(
    "searchPokemon",
    fetchPokemonSearch,
    { staleTime: 86400000 }
  );

  // Set delay between filtering pokemon - avoids unnecessary filtering
  useEffect(() => {
    // Only filter when search query is longer than 3 characters
    // Avoids overusing the API
    if (search.length >= 3) {
      const timer = setTimeout(() => {
        // Filter pokemon locally before requesting from the API
        const filteredPokemon = data.results.filter((pokemon) =>
          pokemon.name.includes(search)
        );

        setPokemon(filteredPokemon);
      }, 200);

      // Clear up timed function
      return () => clearTimeout(timer);
    }
  }, [search, data]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error !== null ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div className="mt-5 grid justify-items-center pokemon-grid-template gap-y-3">
            {pokemon.map((pokemon) => (
              <Pokemon pokemon={pokemon} />
            ))}
          </div>
          <div>{isFetching ? "Fetching..." : null}</div>
        </>
      )}
    </div>
  );
};

export default PokemonSearch;
