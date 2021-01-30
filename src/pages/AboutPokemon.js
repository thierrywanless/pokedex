import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import CountUp from "react-countup";

import { getSprite } from "../helpers/SpriteHelpers";
import TypeChip from "../components/TypeChip";
import StatGauge from "../components/StatGauge";

const AboutPokemon = () => {
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
        <div className="pt-20 relative">
          <div className="absolute top-0 right-0 px-5 py-1 rounded-bl-2xl bg-cream border-l-2 border-b-2">
            <p className="text-3xl text-white">#{data.id}</p>
          </div>
          <div className="absolute top-1 left-0 pl-3 pr-3 pt-1 pb-1">
            <Link
              to="/"
              className="text-2xl text-white no-underline hover:underline"
            >
              &larr; All Pokemon
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="capitalize text-white text-4xl">{data.name}</h1>
            <img className="mt-5" src={image} alt={id} />
            <div className="flex space-x-5 mt-5">
              {data.types.map((type, index) => (
                <TypeChip type={type.type} key={index} />
              ))}
            </div>
            <div className="flex space-x-10 mt-8">
              <div className="flex flex-col items-center">
                {/* Weight - convert hectograms to kg */}
                <CountUp
                  start={0.0}
                  end={data.weight / 10}
                  duration={1.5}
                  delay={0}
                  decimals={1}
                  suffix=" KG"
                >
                  {({ countUpRef }) => (
                    <p className="text-white text-2xl" ref={countUpRef} />
                  )}
                </CountUp>
                <p className="text-gray-400 text-base">Weight</p>
              </div>
              <div className="flex flex-col items-center">
                {/* Height - convert decimeters to m */}
                <CountUp
                  start={0.0}
                  end={data.height / 10}
                  duration={1.5}
                  delay={0}
                  decimals={1}
                  suffix=" M"
                >
                  {({ countUpRef }) => (
                    <p className="text-white text-2xl" ref={countUpRef} />
                  )}
                </CountUp>
                <p className="text-gray-400 text-base">Height</p>
              </div>
            </div>
            <div className="flex flex-col mt-8 text-white">
              <h3 className="text-2xl self-center">Base Stats</h3>
              <div className="flex flex-col content-start mt-2 space-y-3">
                {data.stats.map((stat, index) => (
                  <StatGauge stat={stat} maxStat={255} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPokemon;
