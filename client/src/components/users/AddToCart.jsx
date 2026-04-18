import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "../../context/CartContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext.jsx";

const AddToCart = ({ restaurants, menu }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { increaseCount, decreaseCount, count = 1 } = useContext(CartContext);

  const { backendUrl, token } = useContext(AuthContext);

  const restaurant = restaurants?.find((res) => res?.id === id);
  console.log(restaurant);

  const handleAddToCart = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/cart/add-cart-item`,
        {
          quantity: count,
          productId: menu._id,
          restaurantId: restaurant._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/my-cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding to cart");
    }
  };

  const unitPrice = menu?.price || 0;
  const total = count * unitPrice;

  return (
    <div className="rounded-t-3xl bg-gray-200 px-4 py-2 w-full">
      <div className="flex items-center py-4 mt-6 justify-between">
        <p className="text-xl">₹{total}</p>

        <div className="flex items-center gap-4 border rounded-full w-26 h-12 py-2 px-4 bg-black text-white">
          <p onClick={decreaseCount}>
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
        className="uppercase bg-orange-500 text-white w-full h-12 rounded"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default AddToCart;
