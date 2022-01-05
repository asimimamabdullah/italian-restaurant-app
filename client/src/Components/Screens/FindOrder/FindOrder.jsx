import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./FindOrder.css";
import Footer from "../Home/Sections/Footer";

const FindOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  const findOrder = async (e) => {
    e.preventDefault();

    try {
      const data = await axios.get(`/api/findorder/${ orderNumber }`);
      setOrderData(data.data.order);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 2000);
  }

  return (
    <>
      <div className="findOrder">
        {error && <div className="error__box">{error}</div>}

        <div className="findOrder__container">
          <h3 className='findOrder__container-findOrder'>
            Find Your Order by Order Number
          </h3>
          <form className="findOrder__search-box" onSubmit={findOrder}>
            <input
              type="text"
              name="findOrder__search"
              className="findOrder__searchInput"
              placeholder="Order Number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              required
            />
            <button type="submit" className="findOrder__searchButton">
              <SearchIcon />
            </button>
          </form>

          <div className="findOrder__foundedOrder" style={{ display: orderData ? 'block' : 'none' }}>
            <a
              href={`/findorder/${ orderNumber }`}
              className="findOrder__foundedOrder-number">
              Order found: {orderNumber}
            </a>
            <p className="findOrder__foundedOrder-name">
              Name: {orderData?.name + " " + orderData?.lastName}
            </p>
            <p className="findOrder__foundedOrder-email">
              Email: {orderData?.email}
            </p>
            <p className="findOrder__foundedOrder-date">
              Date: {new Date(orderData?.time).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindOrder;
