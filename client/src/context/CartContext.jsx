import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { backendUrl, token } = useContext(AuthContext);

  const [count, setCount] = useState(1);
  const [cartItems, setCartItems] = useState([]);


  const removeCartItem = async (productId) => {
    try {
      const { data } = await axios.delete(
        backendUrl + `/api/cart/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );
      if (data.success) {
        setCartItems(data.cart?.items || []) ;
        getCartItems()
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCartItems = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/cart/get-cart`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (data.success) {
        setCartItems(data.cart?.items || [])
        console.log(data.cart)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching cart");
    }
  };

  useEffect(() => {
    if (token) {
      getCartItems();
    }
  }, [token]);

  const increaseCount = () => setCount((prev) => prev + 1);
  const decreaseCount = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  const value = {
    count,
    increaseCount,
    decreaseCount,
    setCount,
    cartItems,
    setCartItems,
    removeCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
