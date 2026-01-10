import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from "react-router";

const MyFood = () => {
  const [active, setActive] = useState("All");

  const categories = ["All", "Breakfast", "Lunch", "Dinner"];
  return (
    <div className="p-6 bg-white">
      <div className=" items-center max-h-screen rounded-2xl">
        <div className="flex items-center gap-4 ">
          <Link
            className="w-10 h-10 rounded-full p-3 bg-gray-300 text-black"
            to={"/admin"}
          >
            <FaChevronLeft />
          </Link>
          <h2 className="text-xl">My Profile</h2>
        </div>
      </div>
      <div className="flex justify-between items-center text-center py-8">
        {categories.map((item) => (
          <div key={item} className="flex flex-col items-center">
            <button
              onClick={() => setActive(item)}
              className={`font-medium transition-colors ${
                active === item ? "text-orange-500" : "text-gray-200"
              }`}
            >
              {item}
            </button>
            <hr
              className={`mt-1 w-full border-t-2 transition-all ${
                active === item ? "border-orange-500" : "border-transparent"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFood;
