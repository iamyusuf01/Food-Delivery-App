import React, { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { PiHandWithdraw, PiHandWithdrawThin, PiScrollThin } from "react-icons/pi";
import { CiHeart, CiSaveDown2 } from "react-icons/ci";
import { MdOutlineReviews } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const MyProfile = () => {
  const { isLoggedIn, isAdmin, userData, setIsLoggedIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/logout",
        {}
      );
      if (data.success) {
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className="bg-white" >
          {/*  */}
          <div className=" items-center bg-orange-500 max-h-screen p-6 text-white rounded-2xl">
            <div className="flex items-center gap-4 ">
              <Link
                className="w-10 h-10 rounded-full p-3 bg-gray-200 text-black"
                to={"/admin"}
              >
                <FaChevronLeft />
              </Link>
              <h2 className="text-xl">My Profile</h2>
            </div>
            <div className="text-center pt-4">
              <h2 className="py-1">Available Balance</h2>
              <p className="text-4xl font-semibold">$500.00</p>
              <button className="my-6 h-8 w-28 rounded-md border">Withdraw</button>
            </div>
          </div>
          {/*  */}
          <div className="p-6">
            <ul className=" bg-gray-100 rounded-xl p-8">
              <div
                className="flex justify-between items-center"
                onClick={() => navigate("/profile/personal-info")}
              >
                <li className="flex items-center gap-4">
                  <p className="w-10 h-10 rounded-full p-2 bg-white">
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
              <div className="flex justify-between items-center mt-3">
                <li className="flex items-center gap-4">
                  <p className="w-10 h-10 rounded-full p-2 bg-white">
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
          {/*  */}
          <div className="p-6">
            <ul className=" bg-gray-100 rounded-xl p-6">
              <div className="flex justify-between items-center">
                <li className="flex items-center gap-4">
                  <p className="w-10 h-10 rounded-full p-2 bg-white">
                    <PiHandWithdrawThin size={24} color="orange" />
                  </p>
                  <h2 className="font-medium">Withdrawal History</h2>
                </li>
                <li>
                  <p>
                    <FaChevronRight />
                  </p>
                </li>
              </div>
              <div className="flex justify-between items-center mt-3">
                <li className="flex items-center gap-4">
                  <p className="w-10 h-10 rounded-full p-2 bg-white">
                    <PiScrollThin size={24} color="blue" />
                  </p>
                  <h2 className="font-medium">Number of Orders</h2>
                </li>
                <li>
                  <p>
                    {/* <FaChevronRight /> */} 20k
                  </p>
                </li>
              </div>
            </ul>
          </div>
          {/*  */}
          <div className="p-6">
            <ul className=" bg-gray-100 rounded-xl p-6">
              <div className="flex justify-between items-center">
                <li className="flex items-center gap-4">
                  <p className="w-10 h-10 rounded-full p-2 bg-white">
                    <MdOutlineReviews size={24} color="purple" />
                  </p>
                  <h2 className="font-medium ">User Reviews</h2>
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
          <div className="p-6" onClick={logout}>
            <ul className=" bg-gray-100 rounded-xl p-6  ">
              <div className="flex justify-between items-center">
                <li className="flex items-center gap-4">
                  <p className="w-10 h-10 rounded-full p-2 bg-white">
                    <CiSaveDown2 size={24} color="red" />
                  </p>
                  <button className="">Logout</button>
                </li>
                <p>
                  <FaChevronRight />
                </p>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <div className="pt-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4 ">
              <button
                className="w-10 h-10 rounded-full p-3 bg-gray-200"
                onClick={() => navigate("/")}
              >
                <FaChevronLeft />
              </button>
              <h2 className="font-medium">Profile</h2>
            </div>
          </div>
          <ul className=" bg-gray-100 rounded-xl py-4 px-8 ">
            <div className="flex justify-between items-cente mt-2">
              <li className="w-30 h-30 rounded-full p-3 bg-gray-200">
                <img />
              </li>
              <NavLink to={"/login"} className="flex items-center gap-4">
                <button className="font-semibold">Login</button>
                <FaChevronRight />
              </NavLink>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
