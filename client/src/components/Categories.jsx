import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Categories = () => {
  const itemList = [
    {
      name: "All",
      image: "",
    },
    {
      name: "HotDog",
      image: "",
    },
    {
      name: "Burger",
      image: "",
    },
    {
      name: "Pizza",
      image: "",
    },
  ];
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h2>All Categories</h2>
        <div className="flex items-center gap-2">
          <p>See All</p>
          <FaChevronRight size={16} />
        </div>
      </div>
      <div className="w-full flex gap-4 pt-4 overflow-x-scroll whitespace-nowrap h-23 no-scrollbar">
        {itemList.map((item) => (
          <div
            key={item.name}
            className="min-w-[140px] rounded-full bg-amber-400/60 shadow-lg max-h-15"
          >
            <div className="flex items-center gap-2 text-center text-xl text-indigo-950 font-semibold p-2.5">
              <img
                className=" bg-gray-200 w-10 h-10 rounded-full"
                src={item.image}
              />
              <span className="">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
