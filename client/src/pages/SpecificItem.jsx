import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaChevronLeft, FaPlus, FaSortDown } from "react-icons/fa";
import {  CgSearch } from "react-icons/cg";
import { RiSoundModuleLine } from "react-icons/ri";
// import Select from "react-select";
import { FaX } from "react-icons/fa6";
import OpenRestaurants from "../components/OpenRestaurants";

const SpecificItem = () => {
  const { item } = useParams();
  const { allDish, restaurants, navigate, menuOptions } =
    useContext(AuthContext);

  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState(false);
  const [sort, setSort] = useState("");

  const selectedOption = menuOptions.find((option) => option.value === item);

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

  const handleFilter = (sortBy) => {
    setSort(sortBy);
    let filtered;
    if (sortBy === "low_to_high") {
      filtered = allDish
        .filter((dish) => dish.name.toLowerCase().includes(item))
        .sort((a, b) => a.price - b.price);
    } else if (sortBy === "high_to_low") {
      filtered = allDish
        .filter((dish) => dish.name.toLowerCase().includes(item))
        .sort((a, b) => b.price - a.price);
    }
    setFilteredItems(filtered);
  };

  useEffect(() => {
    const filtered = allDish.filter((dish) =>
      dish.name.toLowerCase().includes(item)
    );

    setFilteredItems(filtered);
    setSort("");
  }, [item]);

  return (
    <div className="p-6 relative min-h-screen">
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
            onClick={() => setFilter(true)}
          >
            <RiSoundModuleLine size={24} fill="white" />
          </button>
        </div>
      </div>
      <h1 className="text-xl font-semibold mb-5">
        Popular {item.charAt(0).toUpperCase() + item.slice(1) + "s"}
      </h1>
      {filteredItems.length === 0 ? (
        <div className="flex items-center justify-center h-50">
          <p className="text-2xl font-semibold text-center text-gray-700">
            No Such Menu Items is Available Right Now!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5">
          {filteredItems.map((item) => (
            <div
              onClick={() =>
                navigate(`/food-details/${item.restaurantId}/${item.itemId}`)
              }
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
      <OpenRestaurants filteredDishes={filteredItems} />
      {filter && (
        <div className="absolute bg-gray-400/20 z-50 w-full left-0 top-0 h-screen">
          <div className="relative bg-white m-6 rounded-2xl min-h-1/4 p-6 space-y-2">
            <div
              onClick={() => setFilter(false)}
              className="absolute right-3 top-3 cursor-pointer bg-red-600 p-3 rounded-full text-white"
            >
              <FaX />
            </div>
            <p className="text-xl font-semibold underline text-gray-800 mb-3 underline-offset-5 ">
              Sort by Price
            </p>
            <div className="flex hover:bg-gray-400/20 p-3">
              <input
                type="radio"
                name="price"
                value={"low_to_high"}
                id="low_to_high"
                className="w-20"
                checked={sort === "low_to_high" ? true : false}
                onChange={(e) => handleFilter(e.target.value)}
              />
              <label
                htmlFor="low_to_high"
                className="text-xl font-bold text-gray-800"
              >
                Low to High
              </label>
            </div>
            <div className="flex hover:bg-gray-400/20 p-3">
              <input
                type="radio"
                name="price"
                value={"high_to_low"}
                id="high_to_low"
                className="w-20"
                checked={sort === "high_to_low" ? true : false}
                onChange={(e) => handleFilter(e.target.value)}
              />
              <label
                htmlFor="high_to_low"
                className="text-xl font-bold text-gray-800"
              >
                High to Low
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecificItem;
