import React from "react";
import "./Select.css";

const PersonSelect = ({ changed }) => {
  return (
    <select name="persons" onChange={changed} required defaultValue="0" className="reserveSeat__select-main">
      <option value="0" disabled>
        How many people?
      </option>

      <option value="1 Person">1 Person</option>
      <option value="2 People">2 People</option>
      <option value="3 People">3 People</option>
      <option value="4 People">4 People</option>
      <option value="5 People">5 People</option>
      <option value="6 People">5 People</option>

      <option value="7 People">6 People</option>
      <option value="8 People">7 People</option>
      <option value="9 People">8 People</option>
      <option value="10 People">9 People</option>
      <option value="11 People">10 People</option>
      <option value="12 People">11 People</option>
      <option value="13 People">12 People</option>
      <option value="14 People">13 People</option>
      <option value="15 People">14 People</option>
      <option value="Large Party">Large Party</option>
    </select>
  );
};

export default PersonSelect;
