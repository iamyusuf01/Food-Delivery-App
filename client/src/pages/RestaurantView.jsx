import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RestaurantsList } from "../assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";

const RestaurantView = () => {

  const itemList = [
    {
      name: 'Burger',
    },
    {
      name: 'Sandwich',
    },
    {
      name: 'Pizza ',
    },
    {
      name: 'Sandwich',
    }
  ]
  const { id } = useParams();
  const navigate = useNavigate();

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
            <div className="py-3">{restaurant?.menu?.map((item) => (
              <div key={item.description}>{item.description}</div>
            ))}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p>
                <FaRegStar size={20}  color="orange" />
              </p>
              <p>{restaurant?.rating}</p>
            </div>
            <div className="flex items-center gap-2">
              <p><TbTruckDelivery size={22} color="orange" /></p>
              <p>{restaurant?.location.city}</p>
            </div>
            <div className="flex items-center gap-2">
              <p><MdOutlineAccessTime size={22} color="orange"  /></p>
              <p>{restaurant?.deliveryTime}</p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="pt-4 grid grid-cols-4 gap-2">
        {
          itemList.map((item, index) => (
            <div key={index.name}>
              <ul className="border w-full border-gray-300 shadow-md  h-8 rounded-2xl text-center">
                <li className="font-normal">{item.name}</li>
              </ul>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default RestaurantView;
