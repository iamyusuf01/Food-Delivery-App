import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { NavLink } from "react-router";
import TrackOrder from "./TrackOrder";

const Order = () => {
  return (
    <div className="font-ui bg-white relative">
      <div className="relative w-full bg-gray-400 h-screen">
        <NavLink
          to="/"
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/80 text-white hover:bg-black"
        >
          <FaChevronLeft />
        </NavLink>
      </div>
      <div
        className="shadow-lg bg-white w-full px-6 rounded-3xl absolute py-4 -bottom-20 right-0 overflow-hidden"
      >
        <hr className="border-2 mt-1 w-12 mx-auto rounded text-gray-300" />
        <TrackOrder />
      </div>
    </div>
  );
};

export default Order;
