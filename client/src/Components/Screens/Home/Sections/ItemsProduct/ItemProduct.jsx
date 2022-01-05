import React from "react";
import "./ItemProduct.css";
import { useNavigate, Link } from "react-router-dom";

const ItemProduct = ({ title, description, price, images }) => {
  const navigate = useNavigate()
  return (
    <Link to="/order" className="item__main">
      <div className="item" onClick={() => navigate('/order')}>
        <img
          src={
            images.url && images.url.endsWith("webp")
              ? images.url.replace("webp", "jpg")
              : images.url
          }
          alt=""
          className="item__image"
          loading="lazy"
        />

        <div className="item__text">
          <span className="item__title">{title && title}</span>
          <br />
          <span className="item__description">
            {description?.substr(0, 60)}...
          </span>

          <div className="item__price-rating">
            <span className="item__price">€ {price && price}</span>
            <span className="item__button">
              <button className="">Order Now!</button>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemProduct;
