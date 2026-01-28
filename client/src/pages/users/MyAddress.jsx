import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa6";
import { FiEdit, FiHome } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router";

const MyAddress = () => {
  const dummyAddresses = [
    {
      id: 1,
      label: "Home",
      address: "221B Baker Street",
      city: "London",
      pincode: "NW1 6XE",
    },
    {
      id: 2,
      label: "Work",
      address: "1600 Amphitheatre Parkway",
      city: "Mountain View",
      pincode: "94043",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="p-6 font-ui">
      <div className="flex items-center gap-4 ">
        <NavLink
          to={"/profile"}
          className="w-10 h-10 rounded-full p-3 bg-gray-200"
        >
          <FaChevronLeft />
        </NavLink>
        <h2 className="font-medium text-xl">My Address</h2>
      </div>
      <div className="h-screen py-2">
        {dummyAddresses.map((item) => (
          <div
            key={item.id}
            className=" bg-sky-50 rounded-xl flex items-center gap-6 py-6 my-6 px-4 "
          >
            <div className="w-15 h-14 px-3 py-3 rounded-full bg-gray-50">
              <FiHome className="text-blue-400" size={28} />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="text-lg uppercase text-gray-600">{item.label}</p>
                <div className="flex items-center gap-4">
                  <button>
                    <FiEdit size={26} className="text-orange-400" />
                  </button>
                  <button>
                    {" "}
                    <RiDeleteBin6Line size={26} className="text-red-400" />
                  </button>
                </div>
              </div>
              <div className="text-gray-400 font-thin pt-2">
                <div className="flex flex-wrap gap-2">
                  <p>{item.address}.</p>
                  <p>{item.city}</p>
                </div>
                <p >{item.pincode}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/profile/add-address")}
        className="border w-full rounded-md py-2 text-lg font-medium bg-orange-500 text-white"
      >
        Add New Address
      </button>
    </div>
  );
};

export default MyAddress;
