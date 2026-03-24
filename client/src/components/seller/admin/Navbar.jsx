import React, { useContext } from "react";
import { CgMenuLeft, CgSearch } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      {/*  */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            className=" w-10 h-10 bg-gray-100 rounded-full p-2"
            onClick={() => navigate("/admin/my-profile")}
          >
            <CgMenuLeft size={26} />
          </button>
          <div>
            <h2 className="uppercase font-semibold text-xs text-amber-600">
              Location
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-xs">Halal Lab Office</p>
              <FaCaretDown />
            </div>
          </div>
        </div>
        <div className="">
          <img className="w-10 h-10 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
