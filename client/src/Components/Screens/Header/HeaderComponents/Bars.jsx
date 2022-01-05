import React from "react";
import "./Bars.css";

const Bars = ({ handleBarsClick }) => {
  return (
    <div className="bars">
      <div className="header__bars" onClick={handleBarsClick}>
        <div className="header__bar"></div>
      </div>
    </div>
  );
};

export default Bars;
