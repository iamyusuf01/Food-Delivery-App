import axios from "axios";
import { createContext, useState } from "react";
import { useParams } from "react-router";

export const PaymentContext = createContext();

export const PaymentContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_API_URL;

//   const [placedOrder, setPlaceOrder] = useState([]);
//   const { id } = useParams();

//   const placeOrderFromCart = async () => {
//     try {
//         const {data} = await axios.post(backendUrl + '/api/order/place', )
//     } catch (error) {
        
//     }
//   }

  const value = {};

  return (
    <PaymentContext.Provider value={value}>
      {props.children}
    </PaymentContext.Provider>
  );
};
