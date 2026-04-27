import axios from "axios";
import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const PaymentContext = createContext();

export const PaymentContextProvider = (props) => {
  const { backendUrl, cartItems, token } = useContext(AuthContext);

  const [placedOrder, setPlaceOrder] = useState([]);
  const navigate = useNavigate();

  const Order = async () => {
    try {
      const { data } = axios.post(
        backendUrl + "/api/payment//initiate",
        {
          orderId: cartItems.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );
      if (data.success) {
        setPlaceOrder(data.payment);
        navigate("/payment");
        console.log(data.payment)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    placedOrder,
    setPlaceOrder,
    Order,
  };

  return (
    <PaymentContext.Provider value={value}>
      {props.children}
    </PaymentContext.Provider>
  );
};
