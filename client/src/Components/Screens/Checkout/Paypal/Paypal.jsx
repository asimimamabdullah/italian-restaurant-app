import React from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";
// import Loading from "../../Global/Loading";

// const initialOptions = {
//   "client-id":
//     "Ac8o4swJtckfwVOCnGLmPeW4KuApWFOLBx4LLW8TcnUD7t5AkSBU6i1yeuPK822ps6QJt-5gL9swQsWI",
//   "merchant-id": "UGUFDKZNBH2TN",
//   "buyer-country": "DE",
//   currency: "EURO",
//   locale: "de_DE",
// };

const Paypal = ({ onSuccess, onCancel, onError, total, loading, setError }) => {
  // const [{ isPending, isResolved }] = usePayPalScriptReducer();
  return (
    <PayPalScriptProvider
      deferLoading={loading}
      options={{
        // "client-id":
        //   "ATSNzle97H2HdLUL3GMnS5I8PuKouWyteOOCVNR-3UqTW5N_0tFs3ddtDitE1IfqAlRXI4hbaEo2yDT9",
        "client-id":
          "Ac8o4swJtckfwVOCnGLmPeW4KuApWFOLBx4LLW8TcnUD7t5AkSBU6i1yeuPK822ps6QJt-5gL9swQsWI",
        // "merchant-id": "92V8XPRZFHZRE",
        // // "buyer-country": "IT",
        // // locale: "de_DE",
        // locale: "en_US",
        locale: "it_IT",
        // intent: "capture",
        currency: "EUR",
      }}>
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        // style={{ layout: "horizontal" }}
        // createBillingAgreement={(data) =>
        //   console.log("create Billing agreement: ", data)
        // }
        // onApprove={(data) => console.log("onApprove: ", data)}
        onApprove={onSuccess}
        onError={onError}
        onCancel={onCancel}
        // onError={(err) => console.log("error occured: ", err)}
        // onInit={(data) => console.log("on init: ", data)}
        createOrder={(data, actions) => {
          console.log("data: ", data);
          if (total !== 0)
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total,
                  },
                },
              ],
            });
        }}
        style={{
          layout: "horizontal",
          label: "checkout",
          height: 40,
        }}
      />
    </PayPalScriptProvider>
  );
};

export default Paypal;
