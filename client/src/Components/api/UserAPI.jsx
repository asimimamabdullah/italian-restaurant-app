import axios from "axios";
import { useState, useEffect, useCallback } from "react";

const UserAPI = (token) => {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [postalCode, setPostalCode] = useState(localStorage.getItem('pcl') ? localStorage.getItem('pcl') : '');
  const [data, setData] = useState({});
  const [minimumOrder, setMinimumOrder] = useState(null);
  const [building, setBuilding] = useState(null);
  const [address, setAddress] = useState(null);
  const [checkName, setCheckName] = useState(null);
  const [checkEmail, setCheckEmail] = useState(null);
  const [checkPhone, setCheckPhone] = useState(null);
  const [takeaway, setTakeaway] = useState(false)
  const [homedelivery, setHomedelivery] = useState(true)
  const [deliveryOption, setDeliveryOption] = useState('homedelivery')
  const [paypalDelivery, setPaypalDelivery] = useState(true)
  const [cashOnDelivery, setCashOnDelivery] = useState(false)
  const [paymentOption, setPaymentOption] = useState('paypaldelivery')

  const getPostalCode = async (postal) => {
    try {
      return await axios.get(`/api/dashboard/onepostalcode/${ postal }`);
    } catch (error) {
      return error.response;
    }
  };

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const auth = {
            headers: { Authorization: `Bearer ${ token }` },
          };

          const data = await axios.get("/api/private", auth);
          setUser(data?.data.user);
          setIsLoggedIn(true);

          if (data?.data?.user?.postalCode) {
            setPostalCode(data?.data?.user.postalCode);
          }
          data.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert(err?.response?.data?.error);
        }
      };
      getUser();
    }
  }, [token]);
  const runGetCode = useCallback(
    async (postal) => {
      await getPostalCode(postal)
        .then((response) => {
          if (response) {

            if (response.data.code.active) {
              setData(response.data.code);
              setMinimumOrder(response.data.code.minOrder);
              localStorage.setItem("pcl", response.data.code.postalCode);
            }
            else if (!response.data.code.active) {
              localStorage.removeItem("pcl");
              setData(null);
              setMinimumOrder(null);
              return;
            }

          }
        })
        .catch((error) => {
          console.log("something wrong here: ", error.response)
          localStorage.removeItem("pcl");
          setData(null);
          setMinimumOrder(null);
        }

        );
    },
    []
  );

  const postal = localStorage.getItem("pcl");
  useEffect(() => {
    if (postalCode) {
      runGetCode(postalCode);
    } else if (postal) {
      runGetCode(postal);
    }
  }, [postalCode, postal, runGetCode]);

  return {
    image: user?.images?.url,
    name: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    userAddress: user?.address,
    userBuilding: user?.building,
    isAdmin: [isAdmin, setIsAdmin],
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    userID: user?._id,
    phone: user?.phone,
    postalCode: [postalCode, setPostalCode],
    postalData: [data, setData],
    minOrder: [minimumOrder, setMinimumOrder],
    building: [building, setBuilding],
    address: [address, setAddress],
    checkName: [checkName, setCheckName],
    checkEmail: [checkEmail, setCheckEmail],
    checkPhone: [checkPhone, setCheckPhone],
    takeaway: [takeaway, setTakeaway],
    homedelivery: [homedelivery, setHomedelivery],
    cashOnDelivery: [cashOnDelivery, setCashOnDelivery],
    paypalDelivery: [paypalDelivery, setPaypalDelivery],
    paymentOption: [paymentOption, setPaymentOption],
    deliveryOption: [deliveryOption, setDeliveryOption],
  };
};

export default UserAPI;
