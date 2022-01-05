import React, { useEffect, useCallback, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Home/Sections/Footer";
import "./FoundOrder.css";

const FoundOrder = () => {
   const { orderNumber } = useParams();
   const [error, setError] = useState(null);
   const [order, setOrder] = useState({});

   const getOrder = useCallback(async () => {
      try {
         const data = await axios.get(`/api/findorder/${ orderNumber }`);
         setOrder(data.data.order);
      } catch (error) {
         setError(error.response.data.error);
      }
   }, [orderNumber]);

   useEffect(() => {
      getOrder();
   }, [getOrder]);

   if (error) {
      setTimeout(() => {
         setError(null);
      }, 2000);
   }
   return (
      <>
         <div className="order__success">
            {error && <div className="error__box">{error}</div>}
            <a href="/" className="order__success-back-link">
               Go back to home page
            </a>

            <div className="order__success-container">
               <h3>Order Found!</h3>
               <br />

               <div className="foundOrder__page-customerInfo">
                  <h4>Customer Information</h4>

                  <div className="foundOrder__page-customerInfo-text">
                     <p>
                        <b>Name</b>: {`${ order?.name ? order?.name : '' } ${ order?.lastName ? order?.lastName : '' }`}
                     </p>
                     <p>
                        <b>Email</b>: {order?.email}
                     </p>
                     <p>
                        <b>Phone</b>: {order?.phone}
                     </p>
                     {order?.deliveryOption === "homedelivery" ? (
                        <>
                           <p>
                              <b>Address</b>: {order?.address}
                           </p>
                           <p>
                              <b>building</b>: {order?.building}
                           </p>
                           <p>
                              <b>Postal Code</b>: {order?.postalCode}
                           </p>
                        </>
                     ) : null}
                  </div>

                  <p className="foundOrder__page-order">Your Order</p>

                  <table className="foundOrder__page-basket">
                     <thead>
                        <tr>
                           <th>Title</th>
                           <th>Quantity</th>
                           <th>Price</th>
                        </tr>
                     </thead>
                     <tbody>
                        {order?.basket?.map((item, i) => (
                           <tr key={i}>
                              <td>{item?.title}</td>
                              <td>{item?.quantity}</td>
                              <td>{item?.price}</td>
                           </tr>
                        ))}
                        <tr className="foundOrder__page-table-total">
                           <td colSpan={2}>Total</td>
                           <td>{order?.total} €
                           </td>
                        </tr>
                     </tbody>
                  </table>

                  {order?.deliveryOption === "homedelivery" ? (
                     <p className="foundOrder__page-delivery">
                        Delivery Fee: <span>{order?.deliveryCharges} €
                        </span>
                     </p>
                  ) : null}
                  <h3 className="foundOrder__page-total">
                     Total:{" "}
                     <span>
                        {order?.deliveryCharges
                           ? order?.total + order?.deliveryCharges
                           : order?.total} €

                     </span>
                  </h3>

                  <div style={{ margin: '30px 0' }}>
                     <p>
                        Delivery Method: "<b>{order?.deliveryOption}</b>"
                     </p>
                     <p>
                        Payment Method: "
                        <b>
                           {order?.paymentOption === "paypaldelivery"
                              ? "paypal"
                              : "cashondelivery"}
                        </b>
                        "
                     </p>
                  </div>
                  {/* <p className="inconvenience-msg">
                     <p className="order__success-inconv-text">
                     For any kind of inconvenience or issue. Please call on this number:{" "}
                     <b>+39 059 3968633</b>
                     </p>
                  </p> */}
                  <p className='inconvenience-msg' style={{}}>
                     For any kind of inconvenience or issue. Please call on this number:{" "}
                     <b>+39 059 3968633</b>
                  </p>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default FoundOrder;
