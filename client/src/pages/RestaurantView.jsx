import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RestaurantsList } from "../assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const RestaurantView = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const restaurant = RestaurantsList.restaurants.find(
    (restaurant) => restaurant.id === parseInt(id)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <button
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            onClick={() => navigate("/all-restaurants")}
          >
            <FaChevronLeft />
          </button>
          <h2 className="font-medium">Restaurant View</h2>
        </div>
        <div className="w-10 h-10 rounded-full p-3 bg-gray-200">
          <HiOutlineDotsHorizontal />
        </div>
      </div>
      <div className="my-4">
        <div className="py-4" id="_id">
          <div className="">
            <img
              src={restaurant?.image}
              className=" bg-gray-300 h-32 w-full rounded-xl"
            />
            <h2 className="pt-2">{restaurant?.name}</h2>
            <p>{restaurant?.menu?.[4]?.description}</p>
          </div>
          <div className="flex justify-between">
            <p>{restaurant?.rating}</p>
            <div className="flex gap-2">
              <p></p>
              <p>{restaurant?.location.city}</p>
            </div>
            <div className="flex gap-2">
              <p></p>
              <p>{restaurant?.deliveryTime}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantView;
