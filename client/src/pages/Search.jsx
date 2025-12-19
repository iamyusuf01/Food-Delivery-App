import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import SearchInput from "../components/Search";
import { FaChevronLeft } from "react-icons/fa6";
import { IoBagHandle } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { IoIosStarOutline } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";

const Search = () => {
  const { allRestaurants, allDish } = useContext(AuthContext);
  console.log(allDish);

  return (
    <div className="px-6 pt-10 min-h-screen">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <span className="bg-gray-500/30 p-3 rounded-full">
            <FaChevronLeft />
          </span>
          <p className="text-xl text-gray-800">Search</p>
        </div>
        <div className="bg-black p-2 rounded-full">
          <IoBagHandle size={28} fill="white" />
        </div>
      </div>
      <SearchInput />
      {allRestaurants.length > 0 ? (
        <div className="">
          <h6>Suggested Restaurants</h6>
          {allRestaurants.slice(0, 5).map((res) => (
            <div key={res.id} className="flex gap-3 mt-3">
              <div className="w-25 h-15 rounded bg-gray-600">
                <img src="/" alt="" />
              </div>
              <div className="flex flex-col gap-2.5 justify-center">
                <p>{res.name}</p>
                <span className="flex gap-2 items-center">
                  <IoIosStarOutline color="orange" size={20} strokeWidth={5} />
                  {res.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <h4>Restaurant Not Found</h4>
        </div>
      )}
      {allDish.length > 0 ? (
        <div className="">
          <h6>Suggested Dishes</h6>
          {allDish.slice(0, 5).map((dish) => (
            <div key={dish.itemId} className="flex gap-3 mt-3">
              <div className="w-25 h-15 rounded bg-gray-600">
                <img src="/" alt="" />
              </div>
              <div className="flex flex-col gap-2.5 justify-center">
                <p>{dish.name}</p>
                <span className="flex gap-2 items-center">
                  <FaRupeeSign color="orange" size={20} strokeWidth={5} />
                  {dish.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">
          <h4>Dish Not Found</h4>
        </div>
      )}
    </div>
  );
};

export default Search;
