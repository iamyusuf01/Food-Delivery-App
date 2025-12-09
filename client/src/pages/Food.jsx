import React from "react";
import { RestaurantsList } from "../assets/assets";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

const Food = () => {
  const navigate = useNavigate()
  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4">
        {RestaurantsList.restaurants.map((item) => (
          <div key={item.id} className="rounded-xl shadow-md" >
            <img src={item.image} className=" h-32 bg-gray-300 rounded-xl" />
            {item.menu.map((food) => (
              <div key={food.itemId} className="py-2 px-1" onClick={() => navigate(`/food-details/${item.id}/${food.itemId}`)}>
                <h2 className="font-medium text-xl">{food.name}</h2>
                <p className="">{item.name}</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">${food.price}</p>
                  <p className="w-8 h-8 mt-2 rounded-full bg-amber-500 py-2 px-2">
                    <FaPlus color="white"/>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
