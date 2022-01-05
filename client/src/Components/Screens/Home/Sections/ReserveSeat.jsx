import React, { useState } from "react";
import "./ReserveSeat.css";
import axios from "axios";
import PersonSelect from "./ReserveSeatComponents/PersonSelect";

const ReserveSeat = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    persons: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
  });

  const changed = (e) => {
    const { name, value } = e.target;

    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/reservoir", { ...data });

      setData({
        persons: "",
        date: "",
        time: "",
        name: "",
        phone: "",
        email: "",
      });

      window.location.href = "/";
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }

  return (
    <div className="reserve-seat">
      {error && <div className="error__box">{error}</div>}
      <h1 className="reserve-seat__title">Reserve Your Table now</h1>

      <div className="reserve-seat__image"></div>

      <div className="reserve-seat__select">
        <form action="" onSubmit={handleSubmit}>
          <div className="people-form">
            <PersonSelect changed={changed} />

            <label htmlFor="date"></label>
            <input
              type="date"
              className="date-picker"
              value={data.date}
              onChange={changed}
              name="date"
              required
              placeholder="pick a date"
            />

            <select
              id="select__reserve-seat"
              typeof="time"
              onChange={changed}
              name="time">
              <option value="0">Select Time</option>
              <option value="3:00 PM">3:00 PM</option>
              <option value="3:30 PM">3:30 PM</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="4:30 PM">4:30 PM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="5:30 PM">5:30 PM</option>
              <option value="6:00 PM">6:00 PM</option>
              <option value="6:30 PM">6:30 PM</option>
              <option value="7:00 PM">7:00 PM</option>
              <option value="7:30 PM">7:30 PM</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="8:30 PM">8:30 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="9:30 PM">9:30 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="10:30 PM">10:30 PM</option>
              <option value="11:00 PM">11:00 PM</option>
            </select>
          </div>

          <div className="details-of-client">
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={data.name}
              onChange={changed}
            />
            <input
              type="phone"
              name="phone"
              placeholder="Phone Number"
              required
              value={data.phone}
              onChange={changed}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={changed}
            />
          </div>

          <div className="reserve-seat__submit-btn">
            <button
              type="submit"
              className=""
              // style={{ background: "rgb(250, 51, 134)" }}>
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReserveSeat;
