import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { restaurants } from "../assets/assets";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import Filter from "../components/Filter";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const itemList = [
  {
    name: "Burger",
  },
  {
    name: "Sandwich",
  },
  {
    name: "Pizza ",
  },
  {
    name: "Sandwich",
  },
];

const RestaurantView = () => {
  const { navigate, restaurants } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState([]);

  const { id } = useParams();

  const restaurant = restaurants.find(
    (restaurant) => restaurant._id?.toString() === id
  );
  const fetchAllMenu = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/menu/all-menu`
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
          <h2 className="font-medium">Restaurant View</h2>
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
              src={restaurant?.image}
              className=" bg-gray-300 h-32 w-full rounded-xl"
            />
            <h2 className="pt-2">{restaurant?.name}</h2>
            <div className="py-3">
              {/* {restaurant?.menu?.map((item) => (
                <div key={item.description}>{item.description}</div>
              ))} */}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <p>
                <FaRegStar size={20} color="orange" />
              </p>
              <p>{restaurant?.rating}</p>
            </div>
            <div className="flex items-center gap-2">
              <p>
                <TbTruckDelivery size={22} color="orange" />
              </p>
              <p>{restaurant?.location.city}</p>
            </div>
            <div className="flex items-center gap-2">
              <p>
                <MdOutlineAccessTime size={22} color="orange" />
              </p>
              <p>{restaurant?.deliveryTime}</p>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="pt-4 grid grid-cols-4 gap-2">
        {itemList.map((item, index) => (
          <div key={index}>
            <ul className="border w-full border-gray-300 shadow-md   h-8 rounded-2xl text-center">
              <li className="font-normal">{item.name}</li>
            </ul>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 justify-between  my-12">
        {menu.map((menuItem, i) => (
          <div key={i} className="rounded-2xl shadow-lg px-4 py-4">
            <div>
              <img src="" className=" w-full h-32 bg-gray-200 " />
              <p className="text-xl font-medium pt-2">{menuItem.name}</p>
              <p className="text-xl">{restaurant?.name}</p>
            </div>
            <div className="flex justify-between items-center pt-2">
              <p>${menuItem.price}</p>
              <button onClick={() => navigate(`/food-details/${menuItem._id}`)}>
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Filter Search */}
      {open && (
        <div className="absolute p-6 rounded-xl right-6 left-6 m-auto top-10 bg-white shadow-lg">
          <div className="flex justify-between items-center">
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
