import React, { useContext, useState } from "react";
import { restaurants } from "../../assets/assets";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/users/Navbar";
import FoodDetailsShimmer from "../../components/lib/FoodDetailsShimmer";
import MenuShimmer from "../../components/lib/MenuShimmer";

const Food = () => {
  const { navigate, restaurants, menu, menuLoading } = useContext(AuthContext);
  return (
    <div className="p-6">
      <Navbar />
      <div className="mt-5">
        <div className="grid grid-cols-2 gap-4">
          {menuLoading
            ? Array.from({ length: 4 }).map((_, i) => <MenuShimmer key={i} />)
            : menu.map((item) => (
                <div
                  key={item._id}
                  className="rounded-2xl shadow-lg px-4 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-28 rounded-2xl bg-gray-200 object-cover"
                  />
                  <h2 className="text-xl font-medium pt-2">{item.name}</h2>
                  <p className="text-gray-600">{item?.restaurant?.name}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">₹{item.price}</p>
                    <button
                      className="w-8 h-8 rounded-full bg-orange-400"
                      onClick={() => navigate(`/food-details/${item._id}`)}
                    >
                      <FaPlus className="mx-auto text-white" />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Food;
