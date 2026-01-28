import React, { useState } from "react";
import { FaChevronLeft, FaLocationDot } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

const AddNewAddress = () => {
  const [active, setActive] = useState("Home");
  const tabs = ["Home", "Work", "Other"];
  const navigate = useNavigate();

  return (
    <div className="font-ui">
      <div className="relative w-full h-48 bg-gray-400">
        <NavLink to={'/profile/my-address'}
          className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/80 text-white hover:bg-black"
        >
          <FaChevronLeft />
        </NavLink>
      </div>
      <div className="p-6">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <p className="py-1 text-lg uppercase">Address</p>
            <div className="flex items-center gap-2 rounded-md py-2 px-2 bg-gray-200">
              <FaLocationDot className="text-gray-500" />
              <input
                type="text"
                placeholder="Add Address"
                className="outline-none w-full text-gray-800 bg-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4 my-4">
            <div className="flex-1">
              <p className="py-1 text-lg uppercase">Street</p>
              <div className="rounded-md py-2 px-2 bg-gray-200">
                <input
                  type="text"
                  placeholder="Add Street"
                  className="outline-none w-full text-gray-800 bg-transparent"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="py-1 text-lg uppercase">Post Code</p>
              <div className="flex items-center gap-2 rounded-md py-2 px-2 bg-gray-200">
                <FaLocationDot className="text-gray-500" />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Add Postal Code"
                  className="outline-none w-full text-gray-800 bg-transparent"
                />
              </div>
            </div>
          </div>
          <div>
            <p className="py-1 text-lg uppercase">Apartment</p>
            <div className="rounded-md py-2 px-2 bg-gray-200">
              <input
                type="text"
                placeholder="Add Apartment"
                className="outline-none w-full text-gray-800 bg-transparent"
              />
            </div>
          </div>
          <div className="py-4">
            <p className="mb-2">Labels</p>
            <div className="flex gap-4 overflow-x-auto">
              {tabs.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setActive(item)}
                  className={`px-4 py-2 min-w-[100px] rounded-md border transition
                    ${
                      active === item
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-gray-300 text-black hover:bg-gray-100"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 text-lg bg-orange-500 text-white py-3 rounded-md hover:bg-orange-600 transition"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewAddress;
