import React from "react";

const MyFood = () => {
  return (
    <div>
      <div className=" items-center bg-orange-500 max-h-screen p-6 text-white rounded-2xl">
        <div className="flex items-center gap-4 ">
          <Link
            className="w-10 h-10 rounded-full p-3 bg-gray-200 text-black"
            to={"/admin"}
          >
            <FaChevronLeft />
          </Link>
          <h2 className="text-xl">My Profile</h2>
        </div>
      </div>
      <div>
        <ul>
          <li>All</li>
          <li>Breakfast</li>
          <li>Lunch</li>
          <li>Dinner</li>
        </ul>
      </div>
    </div>
  );
};

export default MyFood;
