import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import success from "./icons/check.png";
import celeb from "./icons/celebration.png";
import "./OrderSuccess.css";
import Footer from "./../Home/Sections/Footer";
import Loading from "./../Global/Loading";

const OrderSuccess = () => {
    const [order, setOrder] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const params = useParams();

    const getOrder = useCallback(async () => {
        setLoading(true);
        try {
            const orderr = await axios.get(`/api/findorder/${ params.orderID }`);
            setOrder(orderr.data.order);
            setLoading(false);
            return orderr;
        } catch (error) {
            setError("No Order found");
            setLoading(false);
        }
    }, [params.orderID]);

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
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <img src={success} alt="" width="58" height="58" />
                            <div className="order__success-confirm">
                                <h2>Order Confirmed</h2>
                                <img src={celeb} alt="" width="35" height="35" />
                            </div>

                            <p className="order__success-success-text">
                                Your order has been successfully placed.
                                {order?.deliveryOption === "homedelivery"
                                    ? " The Items may arrive at your given destination in 45 minutes"
                                    : order?.deliveryOption === "takeaway" &&
                                    " Now you can pick up your Meal in 30 minutes or more"}
                            </p>

                            <p className="order__success-ordnum-text">
                                Your Order Number is: {order?.orderNumber}
                            </p>

                            <span className="order__success-warning-text">
                                (*Please remember this order number for tracking)
                            </span>
                            {order?.paymentOption === "paypaldelivery" ? (
                                <p className="order__success-total-text">
                                    Total Amount Received:
                                    <span>
                                        {" "}
                                        {order?.deliveryCharges
                                            ? order?.total + order?.deliveryCharges
                                            : order?.total}{" "}
                                        €
                                    </span>
                                </p>
                            ) : (
                                order?.paymentOption === "cashondelivery" && (
                                    <p className="order__success-total-text">
                                        Total Amount to Pay:
                                        <span>
                                            {" "}
                                            {order?.deliveryCharges
                                                ? order?.total + order?.deliveryCharges
                                                : order?.total}{" "}
                                            €
                                        </span>
                                    </p>
                                )
                            )}

                            <p>
                                Payment Status: "<b>{order?.paymentStatus}</b>"
                            </p>

                            <p className="order__success-inconv-text">
                                For any kind of inconvenience or issue. Please call on
                                this number: <b>+39 059 3968633</b>
                            </p>

                            <a
                                href={`/findorder/${ order?.orderNumber }`}
                                className="order__success-order-details-link">
                                see order details here{" "}
                            </a>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default OrderSuccess;
