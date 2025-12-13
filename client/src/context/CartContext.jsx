import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { restaurants } from "../assets/assets";

export const CartContext = createContext();

export const CardContextProvider = (props) => {
  const { id, itemId } = useParams();
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [total, setTotal] = useState("0");
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const navigate = useNavigate();
  console.log(cartItems)

  const restaurant = restaurants?.find((res) => res?.id === id);
  const menuItem = restaurant?.menu?.find((menu) => menu?.itemId === itemId);

  useEffect(() => {
    if (menuItem && typeof menuItem.price === "number") {
      setUnitPrice(menuItem.price);
    } else {
      setUnitPrice(0);
    }
    setCount(1);
  }, [menuItem]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setTotal(count * unitPrice);
  }, [count, unitPrice]);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  const decreaseCount = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : prev)); // prevent going below 1
  };

  const setCountDirect = (newCount) => {
    const n = Number(newCount);
    if (!Number.isNaN(n) && n > 0) setCount(n);
  };

  const addToCartItems = (menuItem, restaurant) => {
    // setResItems((prev) => [...prev, restaurant]);
    setCartItems((prev) => [...prev, menuItem]);
    navigate("/my-cart");
    console.log(menuItem, restaurant);
  };

  const removeCartItem = (itemId) => {
    const remainingItem = cartItems.filter((prev) => prev.itemId !== itemId)
      setCartItems(remainingItem);

  };

  useEffect(() => {
    if (restaurants?.menu) {
      setCartItems(restaurants.menu);
      // setResItems([restaurants]); // wrap object in array
    }
  }, [restaurants]);

  const value = {
    name,
    setName,
    count,
    increaseCount,
    decreaseCount,
    setCount: setCountDirect,
    unitPrice,
    total,
    menuItem,
    restaurant,
    addToCartItems,
    setCartItems,
    cartItems,
    removeCartItem
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
