import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router";
import Notification from "./Notification";
import Messages from "./Messages";

const ViewNotification = () => {
  //   const [activePanel, setActivePanel] = useState(null);
  const [active, setActive] = useState("Notification");
  const navigate = useNavigate();

  const tabs = ["Notification", "Messages"];

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 ">
        <button
          className="w-10 h-10 rounded-full p-3 bg-gray-200"
          onClick={() => navigate(-1)}
        >
          <FaChevronLeft />
        </button>
        <h2 className="font-medium">{active}</h2>
      </div>
      <div className="flex justify-between items-center text-center py-8">
        {tabs.map((item) => (
          <div key={item} className="flex flex-col items-center px-4">
            <button
              onClick={() => setActive(item)}
              className={`${
                active === item ? "text-orange-500" : "text-black"
              }`}
            >
              {item}
            </button>
            <hr
              className={`mt-1 w-full border-t-2 ${
                active === item ? "border-orange-500" : "border-transparent"
              }`}
            />
          </div>
        ))}
      </div>
      {/*  */}
      {active === "Notification" && <Notification />}
      {active === "Messages" && <Messages />}
    </div>
  );
};

export default ViewNotification;
