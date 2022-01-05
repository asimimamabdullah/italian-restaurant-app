import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useStateValue } from "../../../StateProvider";
import Box from "./Box/Box";
import "./Orders.css";
import Footer from './../Home/Sections/Footer';



const Orders = () => {
  const { userAPI } = useStateValue();
  const { userID } = userAPI;

  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    if (userID) {
      const func = async () => {
        try {
          await axios.get(`/api/user/getorders/${ userID }`).then((response) => {
            setOrders(response?.data?.orders?.reverse());
          });
        } catch (error) {
          setError(error.response.data.error);
        }
      };

      func();
    }
  }, [userID]);

  const pendingOrdersSetting = useCallback(() => {

    setPendingOrders(orders?.filter((item) => {
      const orderTime = new Date(item?.time).getTime();
      const nowTime = new Date().getTime() - 60 * 60 * 1000;

      return orderTime > nowTime;
    }))

    setDeliveredOrders(orders?.filter((item) => {
      const orderTime = new Date(item?.time).getTime();
      const nowTime = new Date().getTime() - 60 * 60 * 1000;

      return orderTime < nowTime;
    }))
  }, [orders])
  useEffect(() => {
    pendingOrdersSetting()

  }, [pendingOrdersSetting])


  return (
    <>
      <div className="order__history">
        {error && <div className="error__box">{error}</div>}

        <div className="ordersHistory__front-boxes">
          <div className="orders__box">
            <p className="orders__box-text">
              <span className="orders__box-text-subText1">Pending Orders</span>
              <span className="orders__box-text-subText">
                {pendingOrders?.length > 0 ? pendingOrders?.length : "0"}
              </span>
            </p>
          </div>

          <div className="orders__box" style={{ background: "#8de02c" }}>
            <p className="orders__box-text">
              <span className="orders__box-text-subText1">Completed Orders</span>

              <span className="orders__box-text-subText">
                {deliveredOrders?.length > 0 ? deliveredOrders?.length : "0"}
              </span>
            </p>
          </div>

          <div className="orders__box" style={{ background: "red" }}>
            <p className="orders__box-text">
              <span className="orders__box-text-subText1">Cancelled Orders</span>

              <span className="orders__box-text-subText">0</span>
            </p>
          </div>
        </div>


        <h2 className="order__history-order-title">
          Your Orders
        </h2>
        <div className="order__history-container">

          {orders?.length > 0 ? (
            orders?.map((order, i) => <Box {...order} key={i} />)
          ) : (
            <h1 className='order__history-notFound' >
              You don't have any Orders yet!
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
