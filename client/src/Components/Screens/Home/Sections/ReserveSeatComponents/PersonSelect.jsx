import React from "react";
import "./Select.css";

const PersonSelect = ({ changed }) => {
  return (
    <select
      name="persons"
      onChange={changed}
      required
      defaultValue="0"
      className="reserveSeat__select-main">
      <option value="0" disabled>
        Quante persone?
      </option>

      <option value="1 Person">1 Persona</option>
      <option value="2 People">2 Persone</option>
      <option value="3 People">3 Persone</option>
      <option value="4 People">4 Persone</option>
      <option value="5 People">5 Persone</option>
      <option value="6 People">5 Persone</option>

      <option value="7 People">6 Persone</option>
      <option value="8 People">7 Persone</option>
      <option value="9 People">8 Persone</option>
      <option value="10 People">9 Persone</option>
      <option value="11 People">10 Persone</option>
      <option value="12 People">11 Persone</option>
      <option value="13 People">12 Persone</option>
      <option value="14 People">13 Persone</option>
      <option value="15 People">14 Persone</option>
      <option value="Large Party">Grande Festa</option>
    </select>
  );
};

export default PersonSelect;
