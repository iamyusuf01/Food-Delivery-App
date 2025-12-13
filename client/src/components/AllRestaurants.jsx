import React from "react";
import { restaurants } from "../assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";

const AllRestaurants = () => {
  const navigate = useNavigate();
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
      <div className="my-6">
        {restaurants.map((item, key) => (
          <Link
            to={`/all-restaurants/${item.id}`}
            key={key}
            className="py-6"
            id="_id"
          >
            <div className="">
              <img
                src={item.image}
                className=" bg-gray-300 h-32 w-full rounded-xl"
              />
              <h2 className="pt-2">{item.name}</h2>
              <div className="py-3">
                {item?.menu?.map((item) => (
                  <div key={item.description}>{item.description}</div>
                ))}
              </div>
            </div>
            <div className="flex justify-between pb-4">
              <div className="flex items-center gap-2">
                <p>
                  <FaRegStar size={20} color="orange" />
                </p>
                <p>{item.rating}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>
                  <TbTruckDelivery size={22} color="orange" />
                </p>
                <p>{item.location.city}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>
                  <MdOutlineAccessTime size={22} color="orange" />
                </p>
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
