import React, { useState } from "react";
import { FaChevronLeft, FaPaypal, FaPlus } from "react-icons/fa";
import { PiHandCoins } from "react-icons/pi";
import { RiVisaLine } from "react-icons/ri";
import { SiMastercard } from "react-icons/si";

import Card from "../assets/Card.png";
import CardInput from "../payment/AddCard";
import AddCard from "../payment/AddCard";
import { useNavigate } from "react-router";
const Payment = () => {
  const [input, setInput] = useState(false);
  const navigate = useNavigate()
  const CartItem = [
    { Icon: <PiHandCoins color="orange" size={20} />, title: "Cash" },
    { Icon: <RiVisaLine color="blue" size={20} />, title: "Visa" },
    { Icon: <SiMastercard size={20} fill="orange" />, title: "Mastercard" },
    { Icon: <FaPaypal fill="blue" size={20} />, title: "PayPal" },
  ];
  return (
    <div className="p-6">
      <div className="flex gap-4 items-center">
        <p className="w-10 h-10 rounded-full bg-gray-300 py-3 px-3">
          <FaChevronLeft />
        </p>
        <h2 className="text-xl">Payment</h2>
      </div>
      <div className="flex gap-2">
        {CartItem.map((item) => (
          <div key={item.title} className="w-full grid justify-between pt-6">
            <p className=" h-15 rounded py-4 px-8 bg-gray-200">{item.Icon}</p>
            <p className="text-center">{item.title}</p>
          </div>
        ))}
      </div>
      <div>
        <div className=" flex flex-col items-center my-8 bg-gray-200 rounded-xl text-center">
          <div>
            <img className="rounded-xl  w-52 mt-8" src={Card} />
          </div>
          <div className="py-4">
            <h2 className="font-medium ">No master card added</h2>
            <p className=" text-gray-500">
              You can add a mastercard and <br /> save it for later
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center border rounded border-gray-300 h-12 gap-2">
          <p>
            <FaPlus color="orange" />
          </p>
          <button
            onClick={() => navigate('/payment/add-card')}
            className="uppercase text-orange-400 text-xl cursor-pointer"
          >
            Add New
          </button>
        </div>

        <div className="pt-8 ">
          <div className="flex gap-4">
            <p>Total:</p>
            <p>$40</p>
          </div>
          <button className="uppercase text-white bg-orange-500 w-full mt-4 h-12 rounded font-medium cursor-pointer">
            Pay & Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
