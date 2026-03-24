import React, { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import Menu from "../../pages/admin/Menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Top Bar */}
      <div className="flex justify-between items-center p-6">
        <div className="flex gap-4">
          <button
            aria-label="Open menu"
            className="w-10 h-10 bg-gray-100 rounded-full p-2"
            onClick={() => setIsOpen(true)}
          >
            <CgMenuLeft size={26} />
          </button>

          {/* <div>
            <h2 className="uppercase font-semibold text-xs text-amber-600">
              Location
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-xs">Halal Lab Office</p>
              <FaCaretDown />
            </div>
          </div> */}
        </div>

        {/* Profile */}
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="w-10 h-10 rounded-full bg-gray-400"
        />
      </div>

      {/* Sidebar + Overlay */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-screen w-2/4 bg-gray-50 p-6 shadow-2xl z-50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 px-2 rounded-full bg-gray-200"
            >
              <FaX className="h-3 text-gray-700" />
            </button>

            <div className="py-4">
              <Menu closeSidebar={() => setIsOpen(false)} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;