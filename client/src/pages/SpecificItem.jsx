import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaChevronLeft, FaPlus, FaSortDown } from "react-icons/fa";
import { CgNotes, CgSearch } from "react-icons/cg";
import { RiSoundModuleLine } from "react-icons/ri";
import Select from "react-select";

const SpecificItem = () => {
  const { item } = useParams();
  const { allDish, restaurants, navigate, menuOptions } =
    useContext(AuthContext);

  const selectedOption = menuOptions.find((option) => option.value === item);

  const filteredFoodItems = allDish.filter((dish) =>
    dish.name.toLowerCase().includes(item)
  );

  const findRestaurantName = (id) => {
    const restaurant = restaurants.find((res) => res.id === id);
    return restaurant ? restaurant.name : "Unknown Restaurant";
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "9999px",
      padding: "2px 6px",
      borderColor: "rgba(107,114,128,0.7)",
      boxShadow: "none",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "12px",
      overflow: "hidden",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#f59e0b"
        : state.isFocused
        ? "#fde68a"
        : "white",
      color: state.isSelected ? "white" : "#374151",
      fontWeight: "600",
      cursor: "pointer",
    }),
    singleValue: (base) => ({
      ...base,
      fontWeight: "600",
      color: "#1f2937",
    }),
  };

  return (
    <div className="p-6">
      <div className="flex gap-3 items-center justify-between mb-5">
        <div className="flex gap-3 items-center">
          <div
            onClick={() => navigate(-1)}
            className="bg-gray-500/30 p-3 rounded-full"
          >
            <FaChevronLeft />
          </div>
          <div className="relative text-xl text-gray-800 flex items-center">
            <Select
              value={selectedOption}
              options={menuOptions}
              styles={customStyles}
              onChange={(option) => navigate(`/search/${option.value}`)}
              isSearchable={false}
            />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/search" className="bg-gray-500/30 rounded-full p-1.5">
            <CgSearch size={30} className="text-black mt-0.5 mr-0.5" />
          </Link>
          <button
            className="rounded-full bg-black p-2"
            // onClick={() => navigate("/")}
          >
            <RiSoundModuleLine size={24} fill="white" />
          </button>
        </div>
      </div>
      <h1 className="text-xl font-semibold mb-5">
        Popular {item.charAt(0).toUpperCase() + item.slice(1) + "s"}
      </h1>
      {filteredFoodItems.length === 0 ? (
        <div className="flex items-center justify-center h-50">
          <p className="text-2xl font-semibold text-center text-gray-700">
            No Such Menu Items is Available Right Now!
          </p>
          
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {filteredFoodItems.map((item) => (
            <div
              key={item.itemId}
              className="bg-white shadow-xl p-3 w-full rounded-2xl"
            >
              <div className="bg-gray-500 h-30 w-full rounded-2xl"></div>
              <p className="text-xl font-semibold mt-3">{item.name}</p>
              <p className="text-gray-500 font-semibold mt-1">
                {findRestaurantName(item.restaurantId)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-black font-semibold text-xl">
                  ${item.price}
                </span>
                <p className="w-8 h-8 mt-2 rounded-full bg-amber-500 py-2 px-2">
                  <FaPlus color="white" />
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecificItem;
