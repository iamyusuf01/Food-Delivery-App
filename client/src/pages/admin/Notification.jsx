import React from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Notification = () => {
  // const navigate = useNavigate();
  const notification = [
    {
      icon: "",
      name: "Salman",
      title: " Placed a new order",
      min: "20 Min",
      image: "",
    },
  ];
  return (
    <div className="px-4">
      {notification.map((item) => (
        <div
          key={item}
          className="flex py-2 justify-between gap-4 items-center"
        >
          <div className=" bg-gray-300 w-12 h-12 rounded-full">
            <img />
          </div>
          <div className="flex items-center  gap-8">
            <div className="flex flex-col">
              <h2 className="text-sm">
                {item.name} {item.title}
              </h2>
              <p className="text-xs py-1">{item.min}</p>
            </div>
            <div className="bg-gray-300  w-24 h-16">
              <img />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
