import React from "react";
import "./Items.css";
import { useStateValue } from "../../../../StateProvider";
import ItemProduct from "./ItemsProduct/ItemProduct";
import Loading from "../../Global/Loading";

const Items = () => {
  const { productsAPI } = useStateValue();
  const [products] = productsAPI.products;

  return (
    <>
      <div className="Items">
        <h1 className="items__title">Enjoy Your Meal Now!</h1>

        <div className="items__container">
          {products?.map((p, i) => (
            <ItemProduct {...p} key={i} />
          ))}
        </div>
      </div>

      {(!products || products.length === 0) && <Loading />}
    </>
  );
};

export default Items;
