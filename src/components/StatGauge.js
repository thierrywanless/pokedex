import React from "react";
import CountUp from "react-countup";

import { getColorForStat } from "../helpers/ColorHelpers";

/**
 * Stat Gauge component - shows a percentage of base stat / max stat
 *
 * @param {stat} stat - Pokemon stat { base_stat, stat: { name }}
 * @param {maxStat} maxStat - Maximum stat attainable
 */
const StatGauge = ({ stat, maxStat }) => {
  const {
    base_stat: baseStat,
    stat: { name },
  } = stat;

  const getStatLabel = (statName) => {
    switch (statName) {
      case "hp":
        return "hp";
      case "attack":
        return "atk";
      case "defense":
        return "def";
      case "special-attack":
        return "sp.a";
      case "special-defense":
        return "sp.d";
      case "speed":
        return "spd";
      default:
        throw new Error(`Stat type label not configured: ${statName}`);
    }
  };

  const statColor = getColorForStat(name);

  return (
    <div className="flex space-x-5">
      <p className="uppercase text-xl w-10">{getStatLabel(name)}</p>
      <div className="w-255px bg-white h-8 rounded-full relative overflow-hidden">
        <div
          className={`h-8 bg-${statColor} rounded-full flex items-center justify-center animate-stat`}
          // Set max width of stat bar
          style={{ maxWidth: `${baseStat}px` }}
        ></div>

        <span className="text-gray-700 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CountUp
            start={0}
            end={baseStat}
            duration={1.5}
            delay={0}
            suffix={` / ${maxStat}`}
          >
            {({ countUpRef }) => <p ref={countUpRef} />}
          </CountUp>
        </span>
      </div>
    </div>
  );
};

export default StatGauge;
