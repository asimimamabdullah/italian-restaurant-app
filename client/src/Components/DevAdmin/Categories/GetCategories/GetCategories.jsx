import React from "react";
import "./GetCategories.css";

const GetCategories = ({ categories, handleEdit, handleDelete }) => {
  return (
    <div className="get__categories">
      <h3
        style={{
          letterSpacing: "1.3px",
          padding: "10px 0",
          userSelect: "none",
        }}>
        All Categories
      </h3>
      <div className="get__categories-container">
        {categories?.map((category) => (
          <div className="categories__screen-category" key={category._id}>
            <div className="get__categories-txt-img">
              <div className="categories__screen-category-img">
                <img src={category.images.url} alt="Category" />
              </div>

              <div className="categories__screen-category-text">
                {category.name}
              </div>
            </div>

            <div className="categories__screen-category-btns">
              <button onClick={(e) => handleEdit(category)}>Edit</button>
              <button onClick={(e) => handleDelete(category)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetCategories;
