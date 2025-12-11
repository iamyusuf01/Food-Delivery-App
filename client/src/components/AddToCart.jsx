import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { menu, RestaurantsList } from "../assets/assets";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
const AddToCart = ({menu}) => {
  const { id, itemId } = useParams();
  const {
    increaseCount,
    decreaseCount,
    count = 1,
    unitPrice = 0,
    total = 0,
    menuItem: contextMenuItem,
    addToCart,
    addToCartItems,
  } = useContext(CartContext);

  const displayUnitPrice =
    typeof unitPrice === "number" && unitPrice > 0 ? unitPrice : menu.price;
  const displayTotal =
    typeof total === "number" && total > 0 ? total : count * displayUnitPrice;

  const handleAddToCart = () => {
    addToCartItems(menu.itemId);
  };
  console.log(handleAddToCart);
  return (
    <div className="rounded-3xl bg-gray-200 p-6 w-full">
      <div className="flex items-center py-4 pt-4 mt-6 justify-between ">
        <p className="text-xl">${displayTotal}</p>
        <div className="flex items-center gap-4 border rounded-full w-26 h-12 py-2 px-4 bg-black text-white">
          <p className="" onClick={decreaseCount}>
            <FaMinus />
          </p>
          <p>{count}</p>
          <p onClick={increaseCount}>
            <FaPlus />
          </p>
        </div>
      </div>
      <button
        onClick={handleAddToCart}
        className="uppercase bg-orange-400 text-white items-center w-full h-12 rounded "
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddToCart;
