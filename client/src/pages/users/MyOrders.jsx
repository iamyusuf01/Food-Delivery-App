import Ongoing from "../../components/users/Ongoing";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const MyOrders = () => {
  const [active, setActive] = useState("Ongoing");

  const tabs = ["Ongoing", "History"];

  return (
    <div className="p-6 font-ui">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <button
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            // onClick={() => navigate("/")}
          >
            <FaChevronLeft />
          </button>
          <h2 className="font-medium">My Orders</h2>
        </div>
        <div className="w-10 h-10 rounded-full p-3 bg-gray-200">
          <HiOutlineDotsHorizontal />
        </div>
      </div>
      {/*  */}
      <div className="grid grid-cols-2 items-center py-8 w-full">
        {tabs.map((item) => (
          <div key={item} className="flex flex-col items-center px-4">
            <button
              onClick={() => setActive(item)}
              className={`${
                active === item ? "text-orange-500 font-medium" : "text-black"
              }`}
            >
              {item}
            </button>
            <hr
              className={`mt-1 w-full border ${
                active === item ? "border-orange-500" : "border-gray-300"
              }`}
            />
          </div>
        ))}
      </div>
      {active === 'Ongoing' && <Ongoing/>}
    </div>
  );
};

export default MyOrders;
