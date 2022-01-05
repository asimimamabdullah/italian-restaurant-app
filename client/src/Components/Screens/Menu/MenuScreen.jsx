import React from "react";
import "./MenuScreen.css";

import image from "../../Images/white-wood-textures.jpg";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import Footer from "../Home/Sections/Footer";
import { useStateValue } from "../../../StateProvider";

const MenuScreen = () => {
  const { menuAPI } = useStateValue();
  return (
    <>
      <div className="menu-screen">
        <h1>Our Menu</h1>
        <img src={image} alt="" />

        <div className="menu-screen__content">
          {menuAPI?.menu?.map((item, i) => (
            <div className="menu-screen__group" key={i}>
              <h3 className="menu-screen__group-title">{item.category}</h3>
              <div className="menu-screen__group-image">
                <img src={item.image} alt="" />
              </div>
              {item?.products?.map((product, index) => (
                <div className="subText__group" key={index}>
                  <div className="subText__group-container">
                    <p className="menu-screen__group-subText">{product.name}</p>
                    <br />
                    <p className="menu-screen__group-subText-short">
                      {product?.whisper ? "(" + product.whisper + ")" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="footer__order-page-link">
            <h4>Get Your Favorite Food Now!</h4>
            <span
              onClick={() => (window.location.href = "/order")}
              className="menu-to-menuscreen-arrow"
            >
              <ArrowForwardRoundedIcon />
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenuScreen;
