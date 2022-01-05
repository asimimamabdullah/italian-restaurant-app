import React, { useState } from "react";
import "./OrderTotal.css";
import { getBasketTotal } from "../../../reducer";
import ShoppingBasketRoundedIcon from "@mui/icons-material/ShoppingBasketRounded";
import { useStateValue } from "../../../StateProvider";
import { useNavigate, Link } from "react-router-dom";

const OrderTotal = () => {
  const navigate = useNavigate();
  const state = useStateValue();
  const [basket, setBasket] = state.basket;
  const [error, setError] = useState(null);
  const { userAPI } = useStateValue();
  const [data] = userAPI.postalData;
  const [deliveryOption] = userAPI.deliveryOption;

  const emptyBasket = () => {
    setBasket([]);
  };

  const checkoutClick = () => {
    if (basket.length > 0) {
      navigate("/checkout");
    }
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }

  return (
    <div className="order__right-section">
      <div className="order__right-section-content">
        <h2 className="orderTotal__title">
          {basket?.length} items in Cart
          <ShoppingBasketRoundedIcon
            style={{ color: "#d70f64", fontSize: "xx-large" }}
          />
        </h2>
        {basket?.map((item, i) => (
          <div key={i} className="order__total-list">
            <p className="order__total-title">{item?.title}</p>
            <p className="order__total-price">
              <span className="order__total-list-text">
                x{item?.quantity}
              </span>
              {item?.price} €
            </p>
          </div>
        ))}

        <div
          className="order__total-list"
          style={{
            display: deliveryOption === "takeaway" ? "none" : "flex",
          }}>
          <p className="order__total-title"></p>
          <p
            className="order__total-price"
            style={{ fontSize: "large", fontWeight: "bold" }}>
            <span
              className="order__total-list-text"
              style={{ fontSize: "small", fontWeight: "bold" }}>
              delivery fee
            </span>
            {data?.deliveryPrice}
          </p>
        </div>
        <h3 className="order__total">
          <span> Total </span>
          {parseFloat(getBasketTotal(basket)).toFixed(2)} €
        </h3>
        {deliveryOption === "takeaway" ? null : data?.deliveryPrice ? (
          <h4
            className="order__total-fee-text"
          >
            with delivery fee{" "}
            <span>
              {(
                parseFloat(getBasketTotal(basket)) +
                parseFloat(data?.deliveryPrice)
              ).toFixed(2)}
            </span>
          </h4>
        ) : (
          <h4>Enter Postal Info</h4>
        )}
        <div className="order__total-btns">
          <button
            className="order__total-empty-button"
            onClick={emptyBasket}>
            Empty Cart
          </button>
          <Link
            to={basket.length > 0 ? "/checkout" : "/order"}
            className="order__total-checkout-button-link">
            <button
              className="order__total-checkout-button"
              onClick={checkoutClick}>
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTotal;
