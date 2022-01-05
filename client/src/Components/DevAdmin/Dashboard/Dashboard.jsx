import React from "react";
import Header from "../../Screens/Header/Header";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const removeSideNav = () => {
    const bars = document.querySelector(".header__bars");
    const sideNav = document.querySelector(".dashboard");
    if (sideNav && bars.classList.value.includes("bars-opened") && bars) {
      bars.classList.remove("bars-opened");

      sideNav.style.left = "-100%";
    }
  };

  return (
    <div className="dashboard__main">
      <Header dashboard={true} />

      <div className="headers__side-nav dashboard">
        <div className="headers__side-nav__container">
          <div className="headers__side-nav-main-section">
            <Link
              to="/"
              className="headers__side-nav-text"
              onClick={removeSideNav}>
              <span>Home</span>
            </Link>

            <Link
              to="/dashboard/postalcodes"
              className="headers__side-nav-text"
              onClick={removeSideNav}>
              <span>Locations</span>
            </Link>

            <Link
              to="/dashboard/all_orders"
              className="headers__side-nav-text"
              onClick={removeSideNav}>
              <span>All Orders</span>
            </Link>

            <Link
              to="/dashboard/all_reservoirs"
              className="headers__side-nav-text"
              onClick={removeSideNav}>
              <span>All Reservoirs</span>
            </Link>

            <Link
              to="/dashboard/all_users"
              className="headers__side-nav-text"
              onClick={removeSideNav}>
              <span>Registered Users</span>
            </Link>

            <Link
              onClick={removeSideNav}
              to="/dashboard/products"
              className="headers__side-nav-text headers__side-nav-text-order">
              <span>Products</span>
            </Link>

            <Link
              onClick={removeSideNav}
              to="/dashboard/create_category"
              className="headers__side-nav-text">
              <span>Categories</span>
            </Link>

            <Link
              onClick={removeSideNav}
              to="/dashboard/reports"
              className="headers__side-nav-text">
              <span>Reports</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
