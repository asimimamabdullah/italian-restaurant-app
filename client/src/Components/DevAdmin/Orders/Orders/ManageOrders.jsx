import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import "./ManageOrders.css";
import { useStateValue } from "./../../../../StateProvider";
import axios from "axios";
import Loading from "../../../Screens/Global/Loading";
import NotFound from "../../../Screens/Global/NotFound";
const Box = lazy(() => import("./../Box/Box"));

const ManageOrders = () => {
  const { userAPI } = useStateValue();
  const [isAdmin] = userAPI.isAdmin;
  const [error, setError] = useState(null);
  const { token } = useStateValue();
  const [orders, setOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      const auth = {
        headers: { Authorization: `Bearer ${ token[0] }` },
      };

      const orderr = await axios.get("/api/user/allorders", auth);

      setOrders(orderr.data.orders.reverse());

      return orderr;
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [token]);

  useEffect(() => {
    if (token[0]) {
      getOrders();
    }
  }, [token, getOrders]);

  // useEffect(() => {
  //   if (orders) {


  // const u = orders.filter((item, i) => {
  //   return (
  //     parseInt(new Date(item.createdAt).getMonth()) + 1 ===
  //     12
  //   );
  // });

  //   const pending = orders.filter((item) => {
  //     const orderTime = new Date(item?.time).getTime();
  //     const nowTime = new Date().getTime() - 60 * 60 * 1000;
  //
  //     return orderTime > nowTime;
  //   })
  // })

  const pendingOrdersSetting = useCallback(() => {
    setPendingOrders(
      orders.filter((item) => {
        const orderTime = new Date(item?.time).getTime();
        const nowTime = new Date().getTime() - 60 * 60 * 1000;

        return orderTime > nowTime;
      })
    );

    setDeliveredOrders(
      orders.filter((item) => {
        const orderTime = new Date(item?.time).getTime();
        const nowTime = new Date().getTime() - 60 * 60 * 1000;

        return orderTime < nowTime;
      })
    );
  }, [orders]);
  useEffect(() => {
    pendingOrdersSetting();
  }, [pendingOrdersSetting]);


  if (error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }



  if (!isAdmin) {
    return <NotFound />;
  }



  return (
    <div className="manageOrders">
      {error && <div className="error__box">{error}</div>}

      <div className="manageOrders__header-boxes">
        <div className="manageOrders__header-boxes-box">
          <p className="manageOrders__header-box-title">All Orders</p>
          <p className="manageOrders__header-box-desc">
            {orders?.length ? orders?.length : "0"}
          </p>
        </div>
        <div className="manageOrders__header-boxes-box">
          <p className="manageOrders__header-box-title">Pending Orders</p>
          <p className="manageOrders__header-box-desc">
            {pendingOrders?.length ? pendingOrders?.length : "0"}
          </p>
        </div>
        <div className="manageOrders__header-boxes-box">
          <p className="manageOrders__header-box-title">
            Delivered Orders
          </p>
          <p className="manageOrders__header-box-desc">
            {deliveredOrders?.length ? deliveredOrders?.length : "0"}
          </p>
        </div>
        <div className="manageOrders__header-boxes-box">
          <p className="manageOrders__header-box-title">Earning</p>
          <p className="manageOrders__header-box-desc">2</p>
        </div>
      </div>

      <h2 className="manageOrders__title">Recent Orders</h2>

      <div className="manageOrders__container">

        {orders?.map((order, i) => (
          <React.Fragment key={i}>
            {order?.basket?.length > 0 && (
              <Suspense fallback={<Loading />}>
                <Box {...order} />
              </Suspense>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
