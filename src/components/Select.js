import React from "react";
import { getDisplayedValue } from "../helpers/helpers";

const Select = ({ name, label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);

  return (
    <div className="select-wrapper">
      <select className="native-select" value={value} onChange={onChange}>
        {children}
      </select>
      <div className="select-presentational-bit">
        Sort by: {displayedValue}{" "}
        <img
          class="select-image"
          src={require(`../assets/downarrow.png`)}
          alt="down arrow"
        />{" "}
      </div>
    </div>
  );
};

export default Select;
