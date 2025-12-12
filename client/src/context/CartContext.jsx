import { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RestaurantsList, menu, cart, restaurant } from "../assets/assets";

export const CartContext = createContext();

export const CardContextProvider = (props) => {
  const { id, itemId } = useParams();
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [total, setTotal] = useState("0");
  const [cartItems, setCartItems] = useState(cart)
  const [resItems, setResItems] = useState(restaurant)
  const navigate = useNavigate()

  // const restaurant = RestaurantsList?.restaurants?.find(
  //   (res) => res?.id === id
  // );
  const menuItem = menu.find((menu) => menu?.itemId === itemId);

  useEffect(() => {
    if (menuItem && typeof menuItem.price === "number") {
      setUnitPrice(menuItem.price);
    } else {
      setUnitPrice(0);
    }
    setCount(1);
  }, [menuItem]);

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

  const addToCartItems = (id) => {
    const item = menu.find((item) => item.itemId === id)
    const resItems = restaurant.find((resItem) => resItem.id === id) 
       setCartItems((prev) => ([...prev, item]))
       setResItems((prev) => ([...prev, resItems]))
       navigate('/my-cart')
  }


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
    resItems,
    setResItems
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
