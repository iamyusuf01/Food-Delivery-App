import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Messages = () => {
  const navigate = useNavigate();
  const messages = [
    {
      icon: "",
      name: "Salman",
      comment: "Sounds awesome",
      count: 0,
      //   image: "",
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
        <h2 className="font-medium">Messages</h2>
      </div>
    </div>
  );
};

export default Messages;
