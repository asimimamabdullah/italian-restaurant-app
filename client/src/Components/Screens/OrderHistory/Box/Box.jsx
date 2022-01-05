import React, { useState, useEffect } from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from 'react-router-dom'
import "../../../DevAdmin/Orders/Box/Box.css";


const Box = ({ basket, name, lastName, time, total, deliveryCharges, paymentOption, deliveryOption, orderNumber }) => {
  const [date, setDate] = useState(null);
  const [openBox, setOpenBox] = useState(false);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (time) {
      const orderTime = new Date(time).getTime();
      const nowTime = new Date().getTime() - 60 * 60 * 1000;

      const compare = orderTime > nowTime;
      setPending(compare);

      setDate(new Date(time).toLocaleString());
    }
  }, [time]);

  const handleClick = () => {
    setOpenBox(!openBox);
  };

  return (
    <>
      <div className="manageOrders__box" onClick={handleClick}>
        <table
          className="manageOrders__box-first-table"
          style={{ background: openBox ? "#eee" : "#fff" }}>
          <thead>
            <tr>
              <th>name</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>date</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{lastName ? name + " " + lastName : name} </td>
              <td>{deliveryOption === 'homedelivery' ? total + deliveryCharges : total} € </td>
              <td>{paymentOption === 'paypaldelivery' ? 'Paid' : 'Due'}</td>
              < td style={{ fontSize: "12px", letterSpacing: ".2px" }}>
                {time ? date : ""}
              </td>
              <td style={{ textTransform: "lowercase" }}>{pending ? <span className="manageOrders__box-status-txt-pending" >pending</span> : <span className="manageOrders__box-status-txt-delivered">delivered</span>}</td>

              <td>
                <ArrowForwardIosRoundedIcon
                  style={{
                    transform: openBox ? "rotate(90deg)" : "none",
                    transition: "transform .3s ease",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div
          className="manageOrders__box-description"
          style={{ maxHeight: openBox ? "400px" : "0" }}>
          <table className="manageOrders__box-second-table">
            <thead>
              <tr>
                <th>Items</th>
                <th>Price</th>
                <th>instructions</th>
                <th>Quantity</th>
                <th><Link to={`/findorder/${ orderNumber }`} style={{ color: 'blue' }}>Details</Link></th>
              </tr>
            </thead>
            <tbody>
              {basket?.map((item, i) => (
                <tr key={i}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{pending ? "Pending" : "Delivered"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Box;
