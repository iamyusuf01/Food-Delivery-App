import React from "react";
import { RxDashboard } from "react-icons/rx";
import { IoIosMenu, IoIosNotificationsOutline } from "react-icons/io";
import { IoAddCircleOutline } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className=" bg-white rounded-xl shadow-lg  ">
      <ul className="flex justify-around items-center mt-4 h-16">
        <Link>
          <RxDashboard size={26}  />
        </Link>
        <Link to={'/admin/my-food-list'}>
          <IoIosMenu size={32} />
        </Link>
        <Link to={'/admin/add-item'}>
          <IoAddCircleOutline size={42} color="orange" className="" />
        </Link>
        <Link to={'/admin/chat'}>
          <IoIosNotificationsOutline size={28} />
        </Link>
        <Link>
          <BsPerson  size={28} />
        </Link>
      </ul>
    </div>
  );
};

export default Footer;
