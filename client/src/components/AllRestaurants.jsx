import React from "react";
import { RestaurantsList } from "../assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";

const AllRestaurants = () => {
  const navigate = useNavigate()
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 ">
        <button
          className="w-10 h-10 rounded-full p-3 bg-gray-200"
          onClick={() => navigate("/")}
        >
          <FaChevronLeft />
        </button>
        <h2 className="font-medium">Restaurants</h2>
      </div>
      <div className="my-4">
        {RestaurantsList.restaurants.map((item, key) => (
          <Link to={`/all-restaurants/${item.id}`} key={key} className="py-4" id="_id">
            <div className="">
              <img
                src={item.image}
                className=" bg-gray-300 h-32 w-full rounded-xl"
              />
              <h2 className="pt-2">{item.name}</h2>
              <p>{item.isVeg}</p>
            </div>
            <div className="flex justify-between">
              <p>{item.rating}</p>
              <div className="flex gap-2">
                <p></p>
                <p>{item.location.city}</p>
              </div>
              <div className="flex gap-2">
                <p></p>
                <p>{item.deliveryTime}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
