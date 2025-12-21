import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaPlus } from "react-icons/fa";

const SpecificItem = () => {
  const { item } = useParams();
  const { allDish, restaurants } = useContext(AuthContext);
  const filteredFoodItems = allDish.filter((dish) =>
    dish.name.toLowerCase().includes(item)
  );
  console.log(filteredFoodItems);

  const findRestaurantName = (id) => {
    const restaurant = restaurants.find((res) => res.id === id);
    return restaurant ? restaurant.name : "Unknown Restaurant";
  };

  return (
    <div>
      <h1>Popular {item.charAt(0).toUpperCase() + item.slice(1)}</h1>
      {filteredFoodItems.map((item) => (
        <div key={item.itemId}>
          <div className="bg-gray-500 h-20 w-20"></div>
          <p>{item.name}</p>
          <p>{findRestaurantName(item.restaurantId)}</p>
          <div className="flex justify-between">
            
            <span>${item.price}</span>
            <p className="w-8 h-8 mt-2 rounded-full bg-amber-500 py-2 px-2">
              <FaPlus color="white" />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpecificItem;
