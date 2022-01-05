import React from "react";
import { useStateValue } from "../../../StateProvider";
import CartProduct from "./Sections/CartProduct";
import "./Cart.css";
import OrderTotal from "../Global/OrderTotal";

const Cart = () => {
  const state = useStateValue();
  const [basket] = state.basket;

  return (
    <div className="cart">
      <div className="cart__container">
        {basket?.length === 0 ? (
          <h1 style={{ color: "red", marginLeft: "40px" }}>
            Your cart is empty!
          </h1>
        ) : (
          basket?.map((item, i) => (
            <CartProduct {...item} removeID={i} key={i} />
          ))
        )}
      </div>

      <div className="cart__right-section">
        <OrderTotal />
      </div>
    </div>
  );
};

export default Cart;
