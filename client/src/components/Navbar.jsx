import React from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import Search from "./Search";
import { useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate()
  return (
    <div className="p-6">
      {/*  */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button className=" w-10 h-10 bg-gray-300 rounded-full p-2" onClick={() => navigate('/profile')}>
            <CgMenuLeft size={26} />
          </button>
          <div>
            <h2 className="uppercase font-semibold text-xs text-amber-600">Deliver To</h2>
            <div className="flex items-center gap-2">
              <p className="text-xs">Halal Lab Office</p>
              <p>
                <FaCaretDown />
              </p>
            </div>
          </div>
        </div>
        <div>
          <button className="w-10 h-10 rounded-full bg-black p-1.5">
            <IoBagHandle size={28} fill="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
