import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { restaurants } from "../../assets/assets";
import { FaCartPlus, FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import Filter from "../../components/users/Filter";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { BsPlus } from "react-icons/bs";

const tabs = [
  {
    name: "All",
  },
  {
    name: "Burger",
  },
  {
    name: "Pizza ",
  },
  {
    name: "Sandwich",
  },
];

const RestaurantView = () => {
  const { navigate, restaurants, backendUrl } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [active, setActive] = useState("All");

  const { id } = useParams();

  const restaurant = restaurants.find(
    (restaurant) => restaurant._id?.toString() === id,
  );

  // console.log(restaurant)
  const fetchAllMenu = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `/api/menu/all-menu`,
      );
      if (data.success) {
        setMenu(data.menu);
      }
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  
  useEffect(() => {
    fetchAllMenu();
  }, []);
  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <button
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft />
          </button>
          <h2 className="font-medium font-ui text-xl">Restaurant View</h2>
        </div>
        <div
          className="w-10 h-10 cursor-pointer rounded-full p-3 bg-gray-200"
          onClick={() => setOpen(true)}
        >
          <HiOutlineDotsHorizontal />
        </div>
      </div>
      <div className="my-4">
        <div className="py-4" id="_id">
          <div className="">
            <img
              src={restaurant?.avatar}
              className=" bg-gray-300 h-36 w-full rounded-xl object-cover"
            />
            <h2 className="pt-1 font-medium font-ui text-xl">
              {restaurant?.name}
            </h2>
            <div className="py-3">
              {/* {restaurant?.menu?.map((item) => (
                <div key={item.description}>{item.description}</div>
              ))} */}
            </div>
          </div>
          <div className="flex gap-12 items-center">
            <div className="flex items-center gap-2">
              <FaRegStar size={20} color="orange" />
              <p className="font-medium">{restaurant?.rating}</p>
            </div>
            <div className="flex items-center gap-2">
              <TbTruckDelivery size={22} color="orange" />
              <p>{restaurant?.city}</p>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineAccessTime size={22} color="orange" />
              <p>{restaurant?.deliveryTime} Min</p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="pt-4 grid grid-cols-4 gap-2">
        {tabs.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => setActive(item.name)}
              className={`border w-full ${active === item.name ? "bg-orange-400 text-white" : "text-black"} border-gray-300 shadow-md h-8 rounded-2xl text-center`}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
      <div className="py-6">
        <p className="text-xl font-ui">{active}</p>
      </div>
      <div className="grid grid-cols-2 justify-between gap-4 ">
        {menu.map((menuItem, i) => (
          <div key={i} className="rounded-2xl shadow-lg px-4 py-4">
            <div>
              <img src="" className=" w-full h-24 rounded-2xl bg-gray-300 object-cover" />
              <p className="text-xl font-medium pt-2 font-ui">{menuItem.name}</p>
              <p className="text-sm font-ui text-gray-500">{restaurant?.name}</p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p className="font-bold ">${menuItem.price}</p>
              <button className="w-8 h-8 cursor-pointer rounded-full bg-orange-400 item-center" onClick={() => navigate(`/food-details/${menuItem._id}`)}>
                <FaPlus className="mx-auto text-white"/>
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Filter Search */}
      {open && (
        <div className="absolute p-6 rounded-xl right-6 left-6 m-auto top-10 bg-white shadow-lg">
          <div className="flex justify-between items-center font-ui">
            <h2 className="text-xl">Filter your search</h2>
            <p
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full p-3 bg-gray-200 cursor-pointer"
              // onClick={handleClose}
            >
              <RxCross2 />
            </p>
          </div>
          <Filter />
        </div>
      )}
    </div>
  );
};

export default RestaurantView;
