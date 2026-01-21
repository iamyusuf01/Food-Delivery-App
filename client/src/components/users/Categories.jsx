import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Categories = () => {
  const [active, setActive] = useState("All");
  const tabs = [
    {
      name: "All",
      image: "",
    },
    {
      name: "Hot Dog",
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
    <div className="font-ui text-[18px] py-4 ">
      <div className="flex justify-between items-center">
        <h2 className="">All Categories</h2>
        <div className="flex items-center gap-2">
          <p className="">See All</p>
          <FaChevronRight size={16} />
        </div>
      </div>
      <div className="w-full flex gap-4 py-2 overflow-x-scroll whitespace-nowrap no-scrollbar">
        {tabs.map((item) => (
          <button key={item}
            onClick={() => setActive(item.name)}
            className={`flex shadow-md px-3 rounded-full gap-2 py-1 items-center ${active === item.name ? "bg-amber-400" : "text-black"}  `}
          >
            <div className="w-8 h-8 rounded-full bg-gray-300">
              <img src={item.image} />
            </div>
            <h2>{item.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
