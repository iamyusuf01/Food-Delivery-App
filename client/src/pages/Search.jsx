import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import SearchInput from "../components/Search";
import { FaChevronLeft } from "react-icons/fa6";
import { IoBagHandle } from "react-icons/io5";
import { AuthContext } from "../context/AuthContext";
import { IoIosStarOutline } from "react-icons/io";

const Search = () => {
  const { restaurants } = useContext(AuthContext);
  const suggestedRes = restaurants
    .filter((res) => res.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating);
  console.log(suggestedRes);

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
      <div className="">
        <h6>Suggested Restaurants</h6>
        {suggestedRes.slice(0,5).map((res) => (
          <div key={res.id} className="flex gap-3 mt-3">
            <div className="w-25 h-15 rounded bg-gray-600">
              <img src="" alt="" />
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
    </div>
  );
};

export default Search;
