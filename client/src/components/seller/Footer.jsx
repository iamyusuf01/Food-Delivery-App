import React from "react";
import { RxDashboard } from "react-icons/rx";
import { IoIosMenu, IoIosNotificationsOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const active = "text-orange-500";
  const inactive = "text-gray-500";

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <ul className="flex justify-around items-center h-16">
        {/* Dashboard */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <RxDashboard size={26} />
        </NavLink>

        {/* My Food */}
        <NavLink
          to="/admin/my-food-list"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <IoIosMenu size={32} />
        </NavLink>

        {/* Add Item (always orange) */}
        <NavLink to="/admin/add-item">
          <IoAddCircleOutline size={42} className="text-orange-500" />
        </NavLink>

        {/* Notifications */}
        <NavLink
          to="/admin/chat"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <IoIosNotificationsOutline size={28} />
        </NavLink>

        {/* Profile */}
        <NavLink
          to=""
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          <BsPerson size={28} />
        </NavLink>
      </ul>
    </div>
  );
};

export default Footer;
