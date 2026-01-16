import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Notification = () => {
  const navigate = useNavigate();
  const motification = [
    {
      icon: "",
      name: "Salman",
      title: "new order",
      min: "20 Min",
      image: "",
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 ">
        <button
          className="w-10 h-10 rounded-full p-3 bg-gray-200"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h2 className="font-medium">Notification</h2>
      </div>
    </div>
  );
};

export default Notification;
