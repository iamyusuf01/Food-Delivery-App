import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext.jsx";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const { backendUrl, token } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const updateItemQuantity = async (productId, quantity) => {
    try {
      const { data } = await axios.put(
        backendUrl + "/api/cart/update",
        {
          productId,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (data.success) {
        setCartItems(data.cart.items);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        setCartItems(data.cart?.items);
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
        setCartItems(data.cart?.items || []);
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

  const value = {
    cartItems,
    setCartItems,
    removeCartItem,
    updateItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
