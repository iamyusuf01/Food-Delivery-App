import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PersonalInfo = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="p-6">
      {/*  */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <p
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            onClick={() => navigate("/profile")}
          >
            <FaChevronLeft />
          </p>
          <h2 className="font-medium">Personal Info</h2>
        </div>
        <button
          onClick={() => navigate("/personal-info/edit-profile")}
          className="uppercase underline text-amber-600"
        >
          Edit
        </button>
      </div>
      {/*  */}
      <div className="flex items-center justify-between py-12">
        <div className="w-32 h-32 rounded-full  overflow-hidden bg-gray-200">
          <img src={userData?.avatar} className="w-full h-full object-cover" />
        </div>
        <div className="">
          <h1 className="font-medium text-xl">{userData?.name}</h1>
          <p className="text-sm text-center">{userData?.bio}</p>
        </div>
      </div>
      {/*  */}
      <div className="pt-6">
        <ul className=" bg-gray-100 rounded-xl p-8">
          <div className="flex gap-4 items-center">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <IoPersonOutline size={24} color="orange" />
              </p>
            </li>
            <li>
              <h2 className="uppercase text-xl">Full Name</h2>
              <p className="font-sm text-gray-600">{userData?.name}</p>
            </li>
          </div>
          <div className="flex gap-4 items-center mt-4">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <MdOutlineEmail size={24} color="blue" />
              </p>
            </li>
            <li>
              <h2 className="uppercase text-xl">Email</h2>
              <p className="font-sm text-gray-600">{userData?.email}</p>
            </li>
          </div>
          <div className="flex gap-4 items-center mt-4">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <FiPhone size={24} color="blue" />
              </p>
            </li>
            <li>
              <h2 className="uppercase text-xl">Phone Number</h2>
              <p className="font-sm text-gray-600">{userData?.phone}</p>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfo;
