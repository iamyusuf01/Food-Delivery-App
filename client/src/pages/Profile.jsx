import React, { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { PiShoppingBagOpenThin } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { MdPayment, MdOutlineReviews } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { CiMap } from "react-icons/ci";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const logout = async () => {
    try {
      const {data} = await axios.post('http://localhost:4000/api/auth/logout', {})
      if(data.success) {
        setIsLoggedIn(true)
        navigate('/')
      } else {
        toast.error(data.message)
      }
      console.log(data)
    } catch (error) {
        toast.error(error.message)
      
    }
  }
  const navigate = useNavigate()
  return (
    <div className="p-6">
      {/*  */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <button className="w-10 h-10 rounded-full p-3 bg-gray-200" onClick={() => navigate('/')}>
            <FaChevronLeft />
          </button>
          <h2 className="font-medium">Profile</h2>
        </div>
        <div className="w-10 h-10 rounded-full p-3 bg-gray-200">
          <HiOutlineDotsHorizontal />
        </div>
      </div>
      {/*  */}
      <div className="flex items-center justify-between py-12">
        <div className="w-30 h-30 rounded-full p-3 bg-gray-200">
          <img />
        </div>
        <div className="">
          <h1 className="font-medium text-xl">Vishal Khadok</h1>
          <p className="text-sm text-center">I love fast food</p>
        </div>
      </div>
      {/*  */}
      <div className="pt-6">
        <ul className=" bg-gray-100 rounded-xl p-8">
          <div className="flex justify-between items-center" onClick={() => navigate('/profile/personal-info')}>
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <IoPersonOutline size={24} color="orange" />
              </p>
              <h2 className="font-medium">Personal Info</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <CiMap size={24} color="blue" />
              </p>
              <h2 className="font-medium">Address</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
        </ul>
      </div>
      {/*  */}
      <div className="pt-6">
        <ul className=" bg-gray-100 rounded-xl p-8">
          <div className="flex justify-between items-center">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <PiShoppingBagOpenThin size={24} color="blue" />
              </p>
              <h2 className="font-medium">Card</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <CiHeart size={24} color="purple" />
              </p>
              <h2 className="font-medium">Favourite</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <IoIosNotificationsOutline size={24} color="orange" />
              </p>
              <h2 className="font-medium">Notification</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <MdPayment size={24} color="blue" />
              </p>
              <h2 className="font-medium">Payment</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
        </ul>
      </div>
      {/*  */}
      <div className="pt-6">
        <ul className=" bg-gray-100 rounded-xl p-8">
          <div className="flex justify-between items-center">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <GoQuestion size={24} color="orange" />
              </p>
              <h2 className="font-medium">FAQs</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <MdOutlineReviews size={24} color="purple" />
              </p>
              <h2 className="font-medium">User Reviews</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
          <div className="flex justify-between items-center mt-2">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <CiSettings size={24} color="blue" />
              </p>
              <h2 className="font-medium">Setting</h2>
            </li>
            <li>
              <p>
                <FaChevronRight />
              </p>
            </li>
          </div>
        </ul>
      </div>
      {/* Button Logout */}
      <div className="pt-6">
        <ul className=" bg-gray-100 rounded-xl py-4 px-8 ">
          <div className="flex justify-between items-cente mt-2">
            <li className="flex items-center gap-4">
              <p className="w-10 h-10 rounded-full p-2 bg-gray-50">
                <IoLogOutOutline size={24} color="red" />
              </p>
              <button className="" onClick={logout}>Logout</button>
            </li>
            <p>
              <FaChevronRight />
            </p>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
