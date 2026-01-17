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
    <div className="px-4 h-screen">
      {messages.map((item) => (
        <div
          key={item}
          className="flex py-2 justify-between gap-4 items-center"
        > 
          <div className="flex items-center gap-4">
            <div className="bg-gray-300 w-10 h-10 rounded-full">
              <img/>
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm">
                {item.name}
              </h2>
              <p className="text-xs py-1">{item.comment}</p>
            </div>
          </div>
          <div className="text-center">   
            <p className=" text-sm pb-1">7:40</p>
            <p className=" bg-orange-400 text-white w-6 h-6 text-center rounded-full text-sm">1</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
