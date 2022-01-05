import React from "react";
import "./Footer.css";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link } from "react-router-dom";

import FacebookIcon from "../../../Images/facebookicon.png";
import InstagramIcon from "../../../Images/instagramicon.png";
import TripAdvisorIcon from "../../../Images/tripadvisor.png";
import Logo from "../../Header/Logo";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <h1 className="footer__title">
          <Logo fill="rgb(65, 63, 63)" />
        </h1>

        <div className="footer__container">
          <div className="footer__column">
            <h2 className="footer__column-title">Discover</h2>
            <Link to="/about" className="footer__column-subText">
              <span>About Us</span>
            </Link>
            <span className="footer__column-subText">Reserve Table</span>
            <span className="footer__column-subText">
              <a href="https://www.facebook.com/shahiristorante">
                <img
                  src={FacebookIcon}
                  alt=""
                  width="48"
                  height="48"
                  className="socialLinksIcons"
                />
              </a>
              <a href="https://www.instagram.com/shahi_ristorante/">
                <img
                  src={InstagramIcon}
                  alt=""
                  className="socialLinksIcons"
                  width="48"
                  height="48"
                />
              </a>
              <a href="https://www.tripadvisor.it/Restaurant_Review-g1931037-d15662862-Reviews-Shahi_Ristorante_Pizzeria-Soliera_Province_of_Modena_Emilia_Romagna.html">
                <img
                  width="48"
                  height="48"
                  src={TripAdvisorIcon}
                  alt=""
                  className="socialLinksIcons"
                />
              </a>
            </span>
          </div>

          <div className="footer__column">
            <h3 className="footer__column-title">Let Us know You</h3>
            <Link to="/login" className="footer__column-subText">
              <span>Login</span>
            </Link>
            <Link to="/register" className="footer__column-subText">
              <span>Register</span>
            </Link>
          </div>

          <div className="footer__column">
            <h3 className="footer__column-title">More</h3>
            <span className="footer__column-subText">
              Our Android App
            </span>
            <span className="footer__column-subText">Our IOS App</span>
          </div>

          <div className="footer__column">
            <h3 className="footer__column-title">Our Menu</h3>
            <span className="footer__column-subText">Sushi </span>
            <span className="footer__column-subText">Burger</span>
            <span className="footer__column-subText">Pizza</span>

            <span className="footer__column-subText">Chicken Karahi</span>
            <div className="footer__order-page-link">
              <h4>Order Food Now!</h4>
              <Link className="menu-to-menuscreen-arrow" to="/order">
                <ArrowForwardRoundedIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__final-line">
        <span className="copyright-text">
          <span className="footer__copyright-icon"> ©</span>All Copyrights
          Reserved 2021
        </span>
      </div>
    </>
  );
};

export default Footer;
