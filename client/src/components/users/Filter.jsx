import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Filter = () => {
  const [activeOffer, setActiveOffer] = useState("");
  const [activeTime, setActiveTime] = useState("");

  const offers = [
    { name: "Delivery" },
    { name: "Pick Up" },
    { name: "Offers" },
    { name: "Online payment available" },
  ];

  const times = [
    { minutes: "10-15 min" },
    { minutes: "20 min" },
    { minutes: "30-40 min" },
  ];
  return (
    <div className="font-ui">
      {/* Offers */}
      <div className="flex flex-wrap items-center pt-6 gap-2">
        {offers.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveOffer(item.name)}
            className={`border px-4 border-gray-300 h-8 text-center rounded-full ${activeOffer === item.name ? "bg-orange-500 text-white" : "text-black"}`}
          >
            <p className="text-xl ">{item.name}</p>
          </button>
        ))}
      </div>
      {/* Delivery Time */}
      <div className="pt-8">
        <h2 className="text-xl uppercase">Delivery Time</h2>
        <div className="flex flex-wrap items-center pt-6 gap-3">
          {times.map((item, key) => (
            <button
              key={key}
              onClick={() => setActiveTime(item.minutes)}
              className={`border px-2 border-gray-300 h-8 text-center rounded-full cursor-pointer ${activeTime === item.minutes ? "bg-orange-500 text-white" : "text-black"}`}
            >
              <p className="text-xl">{item.minutes}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Rating */}
      <button className="w-full bg-orange-500 rounded h-10 mt-10 text-white uppercase text-xl">
        Filter
      </button>
    </div>
  );
};

export default Filter;
