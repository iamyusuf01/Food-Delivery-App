import React from "react";
import { menu, restaurant } from "../assets/assets";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";

const Food = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="">
        {restaurant.map((resItem) => (
          <div key={resItem.id} className="grid grid-cols-2 gap-4">
            {menu.map((food) => (
              <div
                key={food.itemId}
                className="py-2 px-1"
                onClick={() => navigate(`/food-details/${resItem.id}/${food.itemId}`)}
              >
                <img src={resItem.image} className=" h-32 bg-gray-300 rounded-xl"/>
                <h2 className="font-medium text-xl">{food.name}</h2>
                <p className="">{resItem.name}</p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">${food.price}</p>
                  <p className="w-8 h-8 mt-2 rounded-full bg-amber-500 py-2 px-2">
                    <FaPlus color="white" />
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
