import React, { useState, useEffect } from "react";
import "./Pay.css";
import Paypal from "./Paypal/Paypal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderTotal from "./../Global/OrderTotal";
import { useStateValue } from "../../../StateProvider";
import { getBasketTotal } from "../../../reducer";
import Footer from "../Home/Sections/Footer";

const Pay = () => {
  const navigate = useNavigate();
  const state = useStateValue();
  const { userAPI, token } = useStateValue();
  const { email, lastName, name, phone } = userAPI;
  const { userID } = userAPI;
  const [basket, setBasket] = state?.basket;
  const [postalCode] = userAPI?.postalCode;
  const [address] = userAPI?.address;
  const [building] = userAPI?.building;
  const [checkPhone] = userAPI?.checkPhone;
  const [checkEmail] = userAPI?.checkEmail;
  const [checkName] = userAPI?.checkName;
  const [data] = userAPI.postalData;
  const [paymentOption] = userAPI.paymentOption;
  const [deliveryOption] = userAPI.deliveryOption;
  const [takeaway] = userAPI.takeaway;
  const [error, setError] = useState("");
  const [deferLoading, setDeferLoading] = useState(true);
  const [totalWithDelivery, setTotalWithDelivery] = useState(null);

  useEffect(() => {
    setTotalWithDelivery(
      parseFloat(getBasketTotal(basket)) + parseFloat(data?.deliveryPrice)
    );
  }, [basket, data?.deliveryPrice]);

  const transactionSuccess = async (paymentData) => {

    const time = Date.now() + 1983;
    try {
      await axios
        .post(
          "/api/user/createorder",
          {
            orders: {
              orderNumber: time,
              userID,
              postalCode,
              address,
              paymentID: paymentData.orderID,
              paymentDetails: paymentData,
              building,
              basket,
              name: name ? name : checkName,
              email: email ? email : checkEmail,
              lastName,
              phone: phone ? phone : checkPhone,
              time,
              total: getBasketTotal(basket),
              deliveryCharges: data?.deliveryPrice,
              deliveryOption,
              paymentOption,
              paymentStatus: "received",
              orderStatus: 'pending'
            },
          },
          {
            headers: {
              Authorization: `Bearer ${ token[0] }`,
            },
          }
        )
        .then(() => {
          setBasket([]);
          navigate(`/checkout/ordersuccess/${ time }`);
        });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const transactionSuccessTakeaway = async (paymentData) => {

    const time = Date.now() + 1983;
    try {
      await axios
        .post(
          "/api/user/createorder",
          {
            orders: {
              orderNumber: time,
              userID,
              paymentID: paymentData.orderID,
              paymentDetails: paymentData,
              basket,
              name: name ? name : checkName,
              email: email ? email : checkEmail,
              lastName,
              phone: phone ? phone : checkPhone,
              time,
              total: getBasketTotal(basket),
              deliveryOption,
              paymentOption,
              paymentStatus: "received",
              orderStatus: 'pending'
            },
          },
          {
            headers: {
              Authorization: `Bearer ${ token[0] }`,
            },
          }
        )
        .then(() => {
          setBasket([]);
          navigate(`/checkout/ordersuccess/${ time }`);
        });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const orderSubmit = async () => {
    const time = Date.now() + 1983;
    try {
      await axios
        .post(
          "/api/user/createorder",
          {
            orders: {
              orderNumber: time,
              userID,
              postalCode,
              address,
              building,
              basket,
              name: name ? name : checkName,
              email: email ? email : checkEmail,
              lastName,
              phone: phone ? phone : checkPhone,
              time,
              total: getBasketTotal(basket),
              deliveryCharges: data?.deliveryPrice,
              deliveryOption,
              paymentOption,
              paymentStatus: "pending",
              orderStatus: 'pending'
            },
          },
          {
            headers: {
              Authorization: `Bearer ${ token[0] }`,
            },
          }
        )
        .then(() => {
          setBasket([]);
          navigate(`/checkout/ordersuccess/${ time }`);
        });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const orderSubmitTakeaway = async () => {
    const time = await Date.now() + 1983;

    try {
      await axios
        .post(
          "/api/user/createorder",
          {
            orders: {
              orderNumber: time,
              userID,
              basket,
              name: name ? name : checkName,
              email: email ? email : checkEmail,
              lastName,
              phone: phone ? phone : checkPhone,
              time,
              total: getBasketTotal(basket),
              deliveryOption,
              paymentOption,
              paymentStatus: "pending",
              orderStatus: 'pending'
            },
          },
          {
            headers: {
              Authorization: `Bearer ${ token[0] }`,
            },
          }
        )
        .then(() => {
          setBasket([]);
          navigate(`/checkout/ordersuccess/${ time }`);
        });
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const transactionError = async () => {
    setError("Transaction not successful");
  };

  const transactionCancel = async (data) => {
    setError("Cancelled Transaction");
  };
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
  }, [
    building,
    basket,
    address,
    deferLoading,
    checkName,
    checkEmail,
    checkPhone,
    data?.minOrder,
    takeaway,
    postalCode,
    data,
  ]);


  if (error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }
  return (
    <>
      <div className="paymentOptions">
        {error && <div className="error__box">{error}</div>}
        <OrderTotal />

        <div className="paymentOptions-Paypal-btn">
          {paymentOption === "paypaldelivery" ? (
            <>
              <button
                onClick={(e) =>
                  deliveryOption === "homedelivery"
                    ? transactionSuccess(
                      { orderID: "something now" }
                    )
                    : deliveryOption === "takeaway" &&
                    transactionSuccessTakeaway(
                      { orderID: "something now" }
                    )
                }
                style={{ padding: "10px 15px", margin: "10px" }}>
                Pay the bill
              </button>
              <Paypal
                total={
                  deliveryOption === "takeaway"
                    ? getBasketTotal(basket)
                    : totalWithDelivery
                }
                onSuccess={
                  deliveryOption === "homedelivery"
                    ? transactionSuccess
                    : deliveryOption === "takeaway" &&
                    transactionSuccessTakeaway
                }
                onCancel={transactionCancel}
                onError={transactionError}
                setError={setError}
                loading={deferLoading}
              />
            </>
          ) : (
            paymentOption === "cashondelivery" && (
              <button
                className="paymentOptions-confirmOrder-btn"
                onClick={
                  deliveryOption === "homedelivery"
                    ? orderSubmit
                    : orderSubmitTakeaway
                }>
                Confirm Order
              </button>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pay;
