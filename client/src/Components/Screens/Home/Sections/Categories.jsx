import React from "react";
import "./Categories.css";
import { useStateValue } from "../../../../StateProvider";
import Category from "./CategoriesCategory/Category";
import Loading from "../../Global/Loading";

const Categories = () => {
  const { categoriesAPI } = useStateValue();
  const [categories] = categoriesAPI.categories;

  return (
    <>
      <div className="Categories">
        <h1 className="category__title">Food Categories</h1>
        <div className="categories">
          {categories?.map((cat, i) => (
            <Category {...cat} key={i} />
          ))}
        </div>
      </div>
      {(!categories || categories.length === 0) && <Loading />}
    </>
  );
};

export default Categories;
