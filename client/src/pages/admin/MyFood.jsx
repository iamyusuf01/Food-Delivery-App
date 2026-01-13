import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { IoMdStar } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const MyFood = () => {
  const [active, setActive] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();

  const categories = ["All", "Breakfast", "Lunch", "Dinner"];

  const cartItem = [
    {
      id: 1,
      name: "Chicken",
      type: "Breakfast",
      price: 60,
      rating: 4.5,
      orderStatus: "Pick up",
    },
  ];

  // close dropdown when clicking outside
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log(menu)
  const fetchMenu = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/menu/get-menu"
      );
      if (data.success) {
        setMenu(data.menu);
        console.log(data)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMenu
  }, [])
  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          className="w-10 h-10 rounded-full p-3 bg-gray-300 text-black"
          to="/admin"
        >
          <FaChevronLeft />
        </Link>
        <h2 className="text-xl">My Food List</h2>
      </div>

      {/* Categories */}
      <div className="flex justify-between items-center text-center py-8">
        {categories.map((item) => (
          <div key={item} className="flex flex-col items-center">
            <button
              onClick={() => setActive(item)}
              className={`font-medium ${
                active === item ? "text-orange-500" : "text-black"
              }`}
            >
              {item}
            </button>
            <hr
              className={`mt-1 w-full border-t-2 ${
                active === item ? "border-orange-500" : "border-transparent"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Food List */}
      {cartItem.map((cart, index) => (
        <div key={cart.id} className="rounded-xl p-4 mb-4 relative">
          <p className="text-gray-400 text-sm mb-2">Total 03 items</p>

          <div className="flex gap-4">
            <div className="bg-gray-300 h-24 w-32 rounded-2xl" />
            <div
              className="w-full"
              onClick={() => navigate("/admin/chef-food-details")}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">{cart.name}</p>

                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <BsThreeDots size={22} />
                </button>
              </div>

              <div className="flex justify-between py-1">
                <span className="bg-orange-200 text-orange-500 rounded-2xl px-3 text-sm">
                  {cart.type}
                </span>
                <p className="font-medium">${cart.price}</p>
              </div>

              <div className="flex justify-between pt-2">
                <div className="flex items-center gap-1">
                  <IoMdStar className="text-orange-500" />
                  <p className="text-orange-500 font-medium text-sm">
                    {cart.rating}
                  </p>
                  <p className="text-gray-500">(10 Reviews)</p>
                </div>
                <p className="text-gray-500">{cart.orderStatus}</p>
              </div>
            </div>
          </div>

          {/* Dropdown */}
          {openIndex === index && (
            <div
              ref={dropdownRef}
              className="absolute right-4 top-14 w-14 px-4 my-2 bg-white shadow-lg rounded-lg overflow-hidden z-50"
            >
              <button className="w-8 h-8 text-orange-400 rounded-full px-1 text-left hover:bg-gray-100">
                <MdEdit size={24} />
              </button>
              <button className="w-8 h-8 rounded-full px-1 mx-auto text-left text-red-600 hover:bg-gray-100">
                <MdDelete size={24} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyFood;
