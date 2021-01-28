import React from "react";
import { useState } from "react";

import PokemonSearch from "../components/PokemonSearch";
import PokemonPaginate from "../components/PokemonPaginate";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter pokemon:"
        onChange={($event) => setSearch($event.target.value)}
        value={search}
      />

      {search.length > 0 ? (
        <PokemonSearch search={search} />
      ) : (
        <PokemonPaginate />
      )}
    </div>
  );
};

export default Home;
