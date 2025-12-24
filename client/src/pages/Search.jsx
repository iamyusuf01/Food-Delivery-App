import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import SearchInput from "../components/Search";
import { FaChevronLeft } from "react-icons/fa6";
import { IoBagHandle } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { IoIosStarOutline } from "react-icons/io";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";

const Search = () => {
  const { allRestaurants, allDish, navigate, menuOptions } =
    useContext(AuthContext);
  console.log(allDish);

  return (
    <div className="px-6 py-10 min-h-screen">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div
            onClick={() => navigate(-1)}
            className="bg-gray-500/30 p-3 rounded-full"
          >
            <FaChevronLeft />
          </div>
          <p className="text-xl text-gray-800">Search</p>
        </div>
        <div className="bg-black p-2 rounded-full">
          <IoBagHandle size={28} fill="white" />
        </div>
      </div>
      <SearchInput />
      <div className="">
        <h3 className="font-semibold text-gray-700">Recent Keywords</h3>
        <div className="w-full flex items-start gap-4 mt-3 overflow-x-scroll whitespace-nowrap h-19 no-scrollbar">
          {menuOptions.map((item) => (
            <div
              className="flex items-center justify-center text-xl text-indigo-950 font-semibold 
              rounded-full px-5 py-3 bg-gray-600/10 shadow-lg"
              key={item.label}
              onClick={() => navigate(`/search/${item.value}`)}
            >
              {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
            </div>
          ))}
        </div>
      </div>
      {allRestaurants.length > 0 ? (
        <div className="mb-5">
          <h6 className="font-semibold text-gray-700">Suggested Restaurants</h6>
          {allRestaurants.slice(0, 5).map((res) => (
            <Link
              to={`/all-restaurants/${res.id}`}
              key={res.id}
              className="flex gap-3 mt-3"
            >
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
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-40 flex items-center justify-center bg-gray-300 rounded mb-5">
          <h4 className="text-2xl font-semibold text-black">
            Restaurant Not Found
          </h4>
        </div>
      )}
      {allDish.length > 0 ? (
        <div className="">
          <h6 className="font-semibold text-gray-700">Suggested Dishes</h6>
          {allDish.slice(0, 5).map((dish) => (
            <div
              onClick={() =>
                navigate(`food-details/${dish.restaurantId}/${dish.itemId}`)
              }
              key={dish.itemId}
              className="flex gap-3 mt-3"
            >
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
        <div className="h-40 flex items-center justify-center bg-gray-300 rounded mb-5">
          <h4 className="text-2xl font-semibold text-black">
            Dishes Not Found
          </h4>
        </div>
      )}
    </div>
  );
};

export default Search;
