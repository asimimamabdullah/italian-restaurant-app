import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import "./Product.css";
import { useStateValue } from "../../../../StateProvider";

const Product = ({ id, title, description, price, image }) => {
  const state = useStateValue();
  const [basket, setBasket] = state.basket;

  const addToBasket = () => {
    const s = basket.findIndex((item) => item.id === id);

    if (s === -1) {
      setBasket([
        ...basket,
        {
          id,
          title,
          description,
          price,
          image,
          quantity: 1,
        },
      ]);
    }

    if (s !== -1) {
      let newArray = [...basket];
      newArray[s] = { ...newArray[s], quantity: newArray[s].quantity + 1 };
      setBasket(newArray);
    }
  };

  return (
    <div className="product">
      {title && (
        <div className="product__container">
          <div className="product__left-section">
            <h3 className="product__title">{title}</h3>
            <p className="product__details">
              {description.length > 60
                ? description.substr(0, 60) + "..."
                : description}
            </p>

            <div className="product__price">
              €{" "}
              <span className="product__price-subText">
                {parseFloat(price).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="product__right-section">
            <img className="product__image" src={image} alt="" loading="lazy" />

            <button className="product__add-button" onClick={addToBasket}>
              <AddRoundedIcon className="addIcon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
