import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Product from "./Sections/Product";
import "./Order.css";

import OrderTotal from "../Global/OrderTotal";
import { useStateValue } from "../../../StateProvider";

import Loading from "../Global/Loading";

const Order = () => {
  const { productsAPI, categoriesAPI } = useStateValue();
  const [categories] = categoriesAPI.categories;
  const [products] = productsAPI.products;
  const navigate = useNavigate();
  const params = useParams();

  const scrollToElement = (name) => {
    window.scrollTo({
      top: document.getElementById(name)?.offsetTop - 140,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (params.categoryName) scrollToElement(params?.categoryName);
  }, [params?.categoryName]);

  document.addEventListener("scroll", (e) => {
    const banner = document.querySelector(".order__banner");
    const header = document.querySelector(".order__header");

    if (banner && header && window.scrollY > banner.clientHeight / 2.5 - 1) {
      header.style.position = "sticky";
    }
  });

  if (!products || !categories) {
    return <Loading />;
  }

  return (
    <>
      <div className="order">
        <div className="order__banner">
          <img
            src="https://images.pexels.com/photos/3758133/pexels-photo-3758133.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt=""
          />
        </div>
        <div className="order__header">
          <div className="order__categories">
            {categories.map((category, i) => (
              <p
                className="order__category"
                key={i}
                onClick={() => navigate(`/order/${ category?.name }`)}>
                {category.name}
              </p>
            ))}
          </div>
        </div>
        <div className="order__allContainer">
          {categories?.map((item, i) => (
            <div key={i} className="order__container-category">
              <div className="order__container-category-data">
                <h2
                  className="order__container-category-text"
                  id={item?.name}>
                  {item?.name}
                </h2>
                <img
                  src={item?.images?.url}
                  width="100%"
                  height="150"
                  alt=""
                />
              </div>

              <div className="order__container">
                {products
                  .filter((cat) => cat.category === item.name)
                  .map((p, i) => {
                    return (
                      <Product
                        key={i}
                        id={p.product_id}
                        title={p.title}
                        description={p.description}
                        price={p.price}
                        image={p.images.url}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="order__right-section-order">
        <OrderTotal />
      </div>
      {(!products || products.length === 0) && <Loading />}
    </>
  );
};

export default Order;
