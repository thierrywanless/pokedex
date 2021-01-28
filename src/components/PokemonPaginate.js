import React from "react";
import { useInfiniteQuery } from "react-query";

import Pokemon from "../components/Pokemon";

/**
 * Renders a paginated list of pokemon
 */
const PokemonPaginate = () => {
  // Provides a paginated list requested by the url
  const fetchPokemonPaginated = ({
    pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=100",
  }) => {
    return fetch(pageParam)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results.map((pokemon, index) => {
          // PokeAPI does not provide pokemon id as part of response - extract from url
          const pokemonIdRegex = /\/pokemon\/(\d+)/;
          const match = pokemonIdRegex.exec(pokemon.url);
          const pokemonId = Number(match[1]);

          return { ...pokemon, id: pokemonId };
        });

        return { ...data, results };
      });
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("pokemon", fetchPokemonPaginated, {
    // Next page is provided from the current page results
    getNextPageParam: (lastPage, pages) => lastPage.next,
    staleTime: 3600000,
  });

  return (
    <div>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <div className="flex flex-wrap">
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.map((pokemon) => (
                  <Pokemon pokemon={pokemon} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div>
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </>
      )}
    </div>
  );
};

export default PokemonPaginate;
