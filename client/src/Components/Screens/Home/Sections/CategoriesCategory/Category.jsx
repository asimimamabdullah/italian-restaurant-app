import React from "react";
import avatar from "../../../../Images/avatar.png";
import "./Category.css";
import { useNavigate } from 'react-router-dom';

const Category = ({ images, name }) => {
  const navigate = useNavigate()
  return (
    <div className="category" onClick={e => navigate(`/order/${ name }`)}>
      <img
        loading="lazy"
        src={
          images
            ? images.url.endsWith("webp")
              ? images.url.replace("webp", "jpg")
              : images.url
            : avatar
        }
        alt=""
      />

      <p className="categories__category-name">{name}</p>
    </div>
  );
};

export default Category;
