import React from "react";
import { getDisplayedValue } from "../helpers/helpers";

const Select2 = ({ name, label, value, onChange, children }) => {
  return (
    <div className="select-wrapper2">
      <select className="native-select" value={value} onChange={onChange}>
        {children}
      </select>
      <div className="select-presentational-bit2">
        {value}{" "}
        <img
          class="select-image2"
          src={require(`../assets/bluedownarrow.png`)}
          alt="down arrow"
        />{" "}
      </div>
    </div>
  );
};

export default Select2;
