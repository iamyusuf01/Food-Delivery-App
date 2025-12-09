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
      <div className="flex justify-between gap-4 pt-4 ">
        {itemList.map((item) => (
          <div
            key={item.name}
            className="rounded-full w-full bg-amber-400 shadow-lg h-8"
          >
            <ul className="flex items-center gap-2 text-center ">
              <img
                className=" bg-gray-200 w-6 h-6 rounded-full ml-2 mt-1"
                src={item.image}
              />
              <li className="">{item.name}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
