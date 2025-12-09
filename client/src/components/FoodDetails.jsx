import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RestaurantsList } from "../assets/assets";
import { FaChevronLeft, FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";

const FoodDetails = () => {
  const { id, itemId } = useParams();
  const [count, setCount] = useState("0");

  const navigate = useNavigate();

  const increase = () => setCount(count + 1);
  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const restId = parseInt(id, 10);
  const menuItemId = parseInt(itemId, 10);

  const restaurant = RestaurantsList.restaurants.find((r) => r.id === restId);
  const foodItem = restaurant?.menu?.find((m) => m.itemId === menuItemId);

  return (
    <div className=" overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 ">
          <button
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            onClick={() => navigate("/food")}
          >
            <FaChevronLeft />
          </button>
          <h2 className="font-medium">Details</h2>
        </div>
        <div className="my-4">
          <div className="py-4" id="_id">
            <div className="">
              <div>
                <img
                  src={restaurant?.image}
                  className=" bg-gray-300 h-32 w-full rounded-xl"
                />
                <p className="mt-6 pl-6 border border-gray-300 rounded-full w-2/3   h-8">
                  {restaurant.name}
                </p>
              </div>
              <div className="py-2">
                <div key={restaurant?.description}>
                  <h2 className="pt-2">{foodItem?.name}</h2>
                  <p className="pt-2"> {foodItem?.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <p>
                  <FaRegStar size={20} color="orange" />
                </p>
                <p>{restaurant?.rating}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>
                  <TbTruckDelivery size={22} color="orange" />
                </p>
                <p>{restaurant?.location.city}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>
                  <MdOutlineAccessTime size={22} color="orange" />
                </p>
                <p>{restaurant?.deliveryTime}</p>
              </div>
            </div>
          </div>
        </div>
        {/*Sizes  */}
        <div className="flex gap-6 items-center">
          <h2 className="uppercase">Size: </h2>
          <div className="flex gap-4">
            <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
              10"
            </p>
            <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
              14"
            </p>
            <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
              16"
            </p>
          </div>
        </div>
      </div>

      {/* Add To Card */}
      <div className="rounded-3xl bg-gray-200 p-6 w-full">
        <div className="flex items-center py-4 pt-4 mt-6 justify-between ">
          <p className="text-xl">${foodItem.price}</p>
          <div className="flex items-center gap-4 border rounded-full w-26 h-12 py-2 px-4 bg-black text-white">
            <p className="" onClick={decrease}>
              <FaMinus />
            </p>
            <p>{count}</p>
            <p onClick={increase}>
              <FaPlus />
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/my-card')}
          className="uppercase bg-orange-400 text-white items-center w-full h-12 rounded ">
          Add To Card
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;
