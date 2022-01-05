import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./Checkout.css";
import { useStateValue } from "../../../StateProvider";
import CartProduct from "../Cart/Sections/CartProduct";
import { getBasketTotal } from "../../../reducer";
import CashOnDelivery from '../../Images/icons8-euro-64.png'
import Paypal from '../../Images/paypal.png'

const Checkout = () => {
  const state = useStateValue();
  const { userAPI } = useStateValue();
  const [postalCode, setPostalCode] = userAPI.postalCode;
  const [basket] = state.basket;
  const [address, setAddress] = userAPI.address;
  const [building, setBuilding] = userAPI.building;
  const [checkEmail, setCheckEmail] = userAPI.checkEmail;
  const [checkName, setCheckName] = userAPI.checkName;
  const [checkPhone, setCheckPhone] = userAPI.checkPhone;
  const [data] = userAPI.postalData;
  const [takeaway, setTakeaway] = userAPI.takeaway;
  const [homedelivery, setHomedelivery] = userAPI.homedelivery;
  const [cashOnDelivery, setCashOnDelivery] = userAPI.cashOnDelivery
  const [paypalDelivery, setPaypalDelivery] = userAPI.paypalDelivery
  const [paymentOption, setPaymentOption] = userAPI.paymentOption
  const [deliveryOption, setDeliveryOption] = userAPI.deliveryOption


  const [error, setError] = useState("");
  const [deferLoading, setDeferLoading] = useState(true);

  const postalCodeChange = (e) => {
    setPostalCode(e.target.value);
    if (e.target.value.length === 0) localStorage.removeItem("pcl");
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }

  useEffect(() => {
    if (
      !postalCode ||
      !address ||
      !building ||
      !checkName ||
      !checkEmail ||
      !checkPhone ||
      parseFloat(getBasketTotal(basket))?.toFixed(2) <
      parseFloat(data?.minOrder) ||
      basket.length === 0 ||
      !data
    ) {
      setDeferLoading(true);
    }
    if (
      (postalCode &&
        address &&
        building &&
        checkName &&
        checkEmail &&
        checkPhone &&
        parseFloat(getBasketTotal(basket))?.toFixed(2) >=
        parseInt(data?.minOrder) &&
        basket.length > 0 &&
        data) ||
      (takeaway && checkEmail && checkName && checkPhone)
    ) {
      setDeferLoading(false);
    }

  }, [building, basket, address, deferLoading, checkName, checkEmail, checkPhone, data?.minOrder, takeaway, postalCode, data]);

  useEffect(() => {
    if ((!data || !postalCode) && deliveryOption === 'homedelivery') setError("Please Enter right Postal code");

  }, [data, deliveryOption, postalCode])




  return (
    <div className="checkout">
      {error && <div className="error__box">{error}</div>}

      <div
        className="errorShowPayment"
        style={{
          display: deferLoading ? "flex" : "none",
        }}>
        <p>* Please fill the Complete details to proceed payment </p>
      </div>
      <form>
        <div className="checkout__categories">
          <div className="checkout__category">
            <div className="checkout__category-title">
              <h2>Delivery Address</h2>
            </div>
            <div className="checkout__category-details flexdircolumn">
              <label className="checkout__takeaway-btn">
                <input
                  type="radio"
                  name="homedelivery"
                  id="takeawaycheck"
                  value="homedelivery"
                  checked={homedelivery}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDeliveryOption(e.target.value)
                      setHomedelivery(e.target.checked);
                      setTakeaway(false);
                    }
                  }}
                />
                <span className="checkout__checkmark"></span>
                <label htmlFor="homedelivery">Home Delivery</label>
              </label>
              <div
                style={{ display: homedelivery ? "flex" : "none" }}
                className="checkout__category-details">
                <div className="checkout__form-group">
                  <label htmlFor="address">
                    Address
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          address?.length === 0 ? "block" : "none",
                      }}>
                      Enter Address*
                    </span>
                  </label>

                  <input
                    type="text"
                    name="address"
                    required
                    value={address ? address : ""}
                    placeholder="eg. Dusseldorf"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="checkout__form-group">
                  <label htmlFor="building">
                    Enter Building name or Apartment, floor
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          building?.length === 0
                            ? "block"
                            : "none",
                      }}>
                      Enter Building, floor*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="building"
                    required
                    value={building ? building : ""}
                    placeholder="eg. building #01 floor 2, flat 34"
                    onChange={(e) => setBuilding(e.target.value)}
                  />
                </div>

                <div className="checkout__form-group">
                  <label htmlFor="postalCode">
                    Postal Code
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          postalCode?.length === 0
                            ? "block"
                            : "none",
                      }}>
                      Enter Postal Code*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={postalCode ? postalCode : ""}
                    placeholder="Postal Code"
                    onChange={postalCodeChange}
                  />
                </div>

                <div className="checkout__form-group">
                  <label htmlFor="checkName">
                    Full Name
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          checkName?.length === 0
                            ? "block"
                            : "none",
                      }}>
                      Enter Full Name*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="checkName"
                    required
                    value={checkName ? checkName : ""}
                    placeholder="Full Name"
                    onChange={(e) => setCheckName(e.target.value)}
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="checkEmail">
                    Email
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          checkEmail?.length === 0
                            ? "block"
                            : "none",
                      }}>
                      Enter Email*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="checkEmail"
                    required
                    value={checkEmail ? checkEmail : ""}
                    placeholder="Email"
                    onChange={(e) => setCheckEmail(e.target.value)}
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="checkPhone">
                    Phone Number
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          checkPhone?.length === 0
                            ? "block"
                            : "none",
                      }}>
                      Enter Your Phone Number*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="checkPhone"
                    required
                    value={checkPhone ? checkPhone : ""}
                    placeholder="Phone Number"
                    onChange={(e) => setCheckPhone(e.target.value)}
                  />
                </div>
              </div>
              <span className="checkout__category-or-btn">OR</span>

              <label className="checkout__takeaway-btn">
                <input
                  type="radio"
                  name="takeaway"
                  id="takeawaycheck"
                  value="takeaway"
                  checked={takeaway}
                  onChange={(e) => {
                    setDeliveryOption(e.target.value)
                    setTakeaway(e.target.checked);
                    setHomedelivery(false);
                  }}
                />
                <span className="checkout__checkmark"></span>
                <label htmlFor="takeaway">Take Away</label>
              </label>

              <div
                style={{ display: takeaway ? "flex" : "none" }}
                className="checkout__category-details">
                <div className="checkout__form-group">
                  <label htmlFor="checkName">
                    Full Name
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          checkName?.length === 0
                            ? "block"
                            : "none",
                      }}>
                      Enter Full Name*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="checkName"
                    required
                    value={checkName ? checkName : ""}
                    placeholder="Full Name"
                    onChange={(e) => setCheckName(e.target.value)}
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="checkEmail">
                    Email
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          checkEmail?.length === 0
                            ? "block"
                            : "none",
                      }}>
                      Enter Email*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="checkEmail"
                    required
                    value={checkEmail ? checkEmail : ""}
                    placeholder="Email"
                    onChange={(e) => setCheckEmail(e.target.value)}
                  />
                </div>
                <div className="checkout__form-group">
                  <label htmlFor="checkPhone">
                    Phone Number
                    <span
                      className="checkout__form-group-span"
                      style={{
                        display:
                          checkPhone?.length === 0
                            ? "block"
                            : "none",
                      }}>
                      Enter Your Phone Number*
                    </span>
                  </label>
                  <input
                    type="text"
                    name="checkPhone"
                    required
                    value={checkPhone ? checkPhone : ""}
                    placeholder="Phone Number"
                    onChange={(e) => setCheckPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="checkout__category">
            <div className="checkout__category-title">
              <h2>Review Items and Delivery</h2>
            </div>

            <div className="checkout__category-details">
              {basket?.map((item, i) => (
                <CartProduct {...item} removeID={i} key={i} />
              ))}
            </div>
          </div>

          <div className="checkout__category">
            <div className="checkout__category-title">
              <h2>Payment Methods</h2>
            </div>

            <div className="checkout__category-details">


              <label className="checkout__takeaway-btn" style={{ height: '80px' }}>
                <input
                  type="radio"
                  name="paypaldelivery"
                  id="takeawaycheck"
                  value="paypaldelivery"
                  checked={paypalDelivery}
                  onChange={(e) => {
                    setPaymentOption(e.target.value)
                    setPaypalDelivery(e.target.checked)
                    setCashOnDelivery(false)
                  }}
                />
                <span className="checkout__checkmark"></span>
                <div className="labelnimage" >

                  <label htmlFor="paypaldelivery">Paypal</label>
                  <img src={Paypal} alt="" width='50' height='50' />
                </div>
              </label>

              <label className="checkout__takeaway-btn withimg" >
                <input
                  type="radio"
                  name="paymentOption"
                  id="takeawaycheck"
                  value="cashondelivery"
                  checked={cashOnDelivery}
                  onChange={(e) => {
                    setPaymentOption(e.target.value)
                    setCashOnDelivery(e.target.checked)
                    setPaypalDelivery(false)
                  }}
                />
                <span className="checkout__checkmark"></span>
                <div className="labelnimage">

                  <label htmlFor="cashondelivery">Cash on Delivery</label>
                  <img src={CashOnDelivery} alt="" width='64' height='64' />
                </div>
              </label>



              <div className="checkout__payment-section">
                <h2>
                  Total
                  <span className="checkout__payment-section-total"></span>
                  {parseFloat(getBasketTotal(basket))?.toFixed(2)} €
                </h2>
              </div>
            </div>

            <div style={{
              display: parseFloat(getBasketTotal(basket)) >=
                parseInt(deliveryOption === 'takeaway' ? '10' : deliveryOption === 'homedelivery' && data?.minOrder ? data?.minOrder : '10') ? 'none' : 'block'
            }}
              className='checkout__total-error'>
              <p>*Order should be minimum of {deliveryOption === 'takeaway' ? '10' : data?.minOrder}</p>
            </div>
          </div>

          <button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="checkout__proceedToPay">
            <Link
              className="checkout__proceedToPay-link"
              to={
                !deferLoading &&
                  parseFloat(getBasketTotal(basket))?.toFixed(2) >=
                  parseInt(deliveryOption === 'takeaway' ? '10' : data?.minOrder) && paymentOption
                  ? "/checkout/paymentoptions"
                  : "/checkout"
              }>
              Proceed To Final Step
              <span>
                <ArrowForwardIosIcon />
              </span>
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
