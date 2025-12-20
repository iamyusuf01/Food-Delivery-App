import React from "react";
import { CgMenuLeft, CgSearch } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import Search from "./Search";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/*  */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            className=" w-10 h-10 bg-gray-300 rounded-full p-2"
            onClick={() => navigate("/profile")}
          >
            <CgMenuLeft size={26} />
          </button>
          <div>
            <h2 className="uppercase font-semibold text-xs text-amber-600">
              Deliver To
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-xs">Halal Lab Office</p>
              <FaCaretDown />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/search" className="bg-gray-500/30 rounded-full p-1">
            <CgSearch size={32} className="text-black mt-0.5 mr-0.5" />
          </Link>
          <button
            className="w-10 h-10 rounded-full bg-black p-1.5"
            onClick={() => navigate("/my-cart")}
          >
            <IoBagHandle size={28} fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
