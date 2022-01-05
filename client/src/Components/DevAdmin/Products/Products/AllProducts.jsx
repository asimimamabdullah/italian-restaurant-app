import React, { useState } from "react";
import { useStateValue } from "../../../../StateProvider";
import Loading from "../../../Screens/Global/Loading";
import AllProductsProduct from "./AllProducts-Product/AllProductsProduct";
import "./AllProducts.css";

const AllProducts = () => {
  const { productsAPI, token } = useStateValue();
  const [callback, setCallback] = productsAPI.callback;
  const [products] = productsAPI.products;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  if (success || error) {
    setTimeout(() => {
      setSuccess(null);
      setError(null);
    }, 4000);
  }

  if (loading) return <Loading />;

  if (!loading)
    return (
      <div className="allproducts">
        {success && <div className="success__box">{success}</div>}
        {error && <div className="error__box">{error}</div>}

        <div className="allproducts__container">
          {products.map((product) => (
            <AllProductsProduct
              {...product}
              token={token}
              loading={loading}
              setLoading={setLoading}
              success={success}
              setSuccess={setSuccess}
              key={product._id}
              error={error}
              setError={setError}
              callback={callback}
              setCallback={setCallback}
            />
          ))}
        </div>
      </div>
    );
};

export default AllProducts;
