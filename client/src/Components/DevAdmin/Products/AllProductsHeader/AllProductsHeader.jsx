import React from "react";
import "./AllProductsHeader.css";
import { Link, Outlet } from "react-router-dom";

const AllProductsHeader = () => {
  return (
    <>
      <div>
        <div className="allproducts__header">
          <div className="order__header">
            <div className="order__categories">
              <Link to="/dashboard/products">
                <p className="order__category">All Products</p>
              </Link>

              <Link to="/dashboard/products/create_product">
                <p className="order__category">Create Product</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default AllProductsHeader;
