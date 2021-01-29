import React from "react";

import { getColorForType } from "../helpers/ColorHelpers";

/**
 * Type Chip component - Renders a coloured chip depending on the type supplied
 *
 * @param {type} type - Pokemon type { name }
 */
const TypeChip = ({ type }) => {
  const color = getColorForType(type);

  return (
    <div
      className={`flex justify-center py-0.5 w-32 border-none rounded-full bg-${color}`}
    >
      <p className="text-xl capitalize">{type.name}</p>
    </div>
  );
};

export default TypeChip;
