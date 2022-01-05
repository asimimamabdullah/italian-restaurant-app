import React from "react";
import "./CartProduct.css";
import { useStateValue } from "../../../../StateProvider";

const CartProduct = ({
  id,
  title,
  description,
  price,
  image,
  quantity,
}) => {
  const state = useStateValue();
  const [basket, setBasket] = state.basket;

  const handleAdd = () => {
    const s = basket.findIndex((item) => item.id === id);

    if (s !== -1) {
      let newArray = [...basket];
      newArray[s] = { ...newArray[s], quantity: newArray[s].quantity + 1 };
      setBasket(newArray);
    }
    if (s === -1) return;
  };

  const handleSubtract = () => {
    const s = basket.findIndex((item) => item.id === id);

    if (s !== -1) {
      if (basket[s].quantity > 1) {
        let newArray = [...basket];
        newArray[s] = { ...newArray[s], quantity: newArray[s].quantity - 1 };
        setBasket(newArray);
      }
      if (basket[s].quantity === 1) {
        let newArray = [...basket];
        newArray.splice(s, 1);
        setBasket(newArray);
      }
    }
  };

  return (
    <div className="cart__product">
      <div className="cart__product-container">
        <div className="cart__product-image-container">
          <img src={image} alt="" className="cart__product-image" />
        </div>
        <div className="cart__product-text-section">
          <h3 className="cart__product-title">{title}</h3>
          <p className="cartProduct__description">
            {description.substring(0, 60)}
          </p>
          <p className="cart__product-price">€ {price}</p>
        </div>
        <div className="cart__product-price-incre">
          <button
            type="button"
            className="cartProduct__minus cartProduct__same"
            onClick={handleSubtract}>
            -
          </button>
          <span className="cartProduct__quantity cartProduct__same">
            {quantity}
          </span>
          <button
            type="button"
            className="cartProduct__plus cartProduct__same"
            onClick={handleAdd}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
