import React from "react";
import { RestaurantsList } from "../assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Restaurants = () => {
  const navigate = useNavigate()
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2>Open Restaurants</h2>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/all-restaurants')}>
          <p>See All</p>
          <FaChevronRight size={16} />
        </div>
      </div>
      <div className="my-4">
        {RestaurantsList.restaurants.slice(0, 4).map((item) => (
          <Link to={`/restaurants/${item.id}`} key={item.id} className="py-4">
            <div className="">
              <img src={item.image}  className=" bg-gray-300 h-32 w-full rounded-xl" />
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

export default Restaurants;