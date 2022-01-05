import React from "react";
import "./Menu.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useStateValue } from "../../../../StateProvider";
import { Link } from "react-router-dom";

const Menu = () => {
  const { menuAPI } = useStateValue();

  return (
    <div className="menu">
      <h1 className="menu__title">Our Menu</h1>

      <div className="menu__categories">
        {menuAPI?.menu?.slice(0, 5).map((item, i) => (
          <div className="menu__category" key={i}>
            <h2 className="menu__category-title">{item.category}</h2>

            <ul className="menu__category-list">
              {item?.products?.slice(0, 5).map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </div>
        ))}
        <div className="footer__order-page-link">
          <p className="footer__order-page-link-text">
            Click Here to See full menu
          </p>
          <Link className="menu-to-menuscreen-arrow" to="/menu">
            <ArrowForwardRoundedIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
