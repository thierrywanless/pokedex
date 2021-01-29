import React from "react";
import { useState } from "react";

import PokemonSearch from "../components/PokemonSearch";
import PokemonPaginate from "../components/PokemonPaginate";

const Home = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="pb-5">
      <div className="w-full flex justify-center bg-red-500 rounded-b-full">
        <input
          className="w-10/12 md:w-96 h-12 px-4 m-2 mb-4 text-lg text-gray-700 placeholder-gray-600 border border-transparent shadow-lg rounded-full focus:ring-4 focus:outline-none "
          type="text"
          placeholder="Enter pokemon:"
          onChange={($event) => setSearch($event.target.value)}
          value={search}
        />
      </div>

      {search.length >= 3 ? (
        <PokemonSearch search={search} />
      ) : (
        <PokemonPaginate />
      )}
    </div>
  );
};

export default Home;
