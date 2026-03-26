import React, { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoPersonOutline } from "react-icons/io5";
import { PiHandWithdrawThin, PiScrollThin } from "react-icons/pi";
import { CiSaveDown2, CiSettings } from "react-icons/ci";
import { MdOutlineReviews } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const SellerProfile = () => {
  const { isLoggedIn, isAdmin, isSeller, setIsLoggedIn, backendUrl } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (data.success) {
        setIsLoggedIn(false);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ---------- NOT LOGGED IN ---------- */
  if (!isLoggedIn) {
    return (
      <div className="pt-6">
        <div className="flex items-center gap-4 px-6">
          <button
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            onClick={() => navigate("/")}
          >
            <FaChevronLeft />
          </button>
          <h2 className="font-medium">Profile</h2>
        </div>

        <ul className="bg-gray-100 rounded-xl p-6 mt-4 mx-6">
          <NavLink to="/login" className="flex justify-between items-center">
            <span className="font-semibold">Login</span>
            <FaChevronRight />
          </NavLink>
        </ul>
      </div>
    );
  }

  /* ---------- LOGGED IN ---------- */
  return (
    <div className="bg-white font-ui min-h-screen">
      {isSeller && !isAdmin && (
        <div className="bg-orange-500 p-6 text-white rounded-b-2xl">
          <div className="flex items-center gap-4">
            <Link
              to="/seller"
              className="w-10 h-10 rounded-full p-3 bg-gray-200 text-black"
            >
              <FaChevronLeft />
            </Link>
            <h2 className="text-xl">Seller Profile</h2>
          </div>

          <div className="text-center pt-4">
            <p>Available Balance</p>
            <p className="text-4xl font-semibold">$500.00</p>
            <button className="my-6 h-8 w-28 rounded-md border">
              Withdraw
            </button>
          </div>
        </div>
      )}

      {/* COMMON SECTIONS */}
      <div className="p-6 space-y-4">

        <ul className="bg-gray-100 rounded-xl p-6">
          <div
            onClick={() => navigate("/profile/personal-info")}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <IoPersonOutline size={24} className="text-orange-500" />
              <span>Personal Info</span>
            </div>
            <FaChevronRight />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
              <CiSettings size={24} className="text-blue-500" />
              <span>Settings</span>
            </div>
            <FaChevronRight />
          </div>
        </ul>

        <ul className="bg-gray-100 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <PiHandWithdrawThin size={24} className="text-orange-500" />
              <span>Withdrawal History</span>
            </div>
            <FaChevronRight />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
              <PiScrollThin size={24} className="text-blue-500" />
              <span>Number of Orders</span>
            </div>
            <span>20k</span>
          </div>
        </ul>

        <ul className="bg-gray-100 rounded-xl p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <MdOutlineReviews size={24} className="text-purple-500" />
              <span>User Reviews</span>
            </div>
            <FaChevronRight />
          </div>
        </ul>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="w-full bg-gray-100 rounded-xl p-6 flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <CiSaveDown2 size={24} className="text-red-500" />
            <span>Logout</span>
          </div>
          <FaChevronRight />
        </button>

      </div>
    </div>
  );
};

export default SellerProfile;
