import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";

const AddCard = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expire, setExpire] = useState("");
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);

  // const navigate = useNavigate();
 
  return (
    <div className="p-6">
      <div className="flex gap-4 items-center">
        <NavLink to={'/payment'} className="w-10 h-10 rounded-full bg-gray-300 py-3 px-3">
          <FaChevronLeft />
        </NavLink>
        <p className="text-xl">
          Add Card
        </p>
      </div>
      <form>
        <div className=" min-h-screen pt-8">
          <div className="">
            <p className="text-gray-400 uppercase">Card Holder Name</p>
            <input
              type="name"
              placeholder="enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="outline-none border rounded px-2 border-gray-300 w-full h-10 my-1"
            />
          </div>
          <div className="">
            <p className="text-gray-400 uppercase">Card Number</p>
            <input
              type="text"
              placeholder="enter card number"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              required
              className="outline-none border rounded px-2 border-gray-300 w-full h-10 my-1"
            />
          </div>
          <div className="flex justify-between gap-4 my-2">
            <div className="">
              <p className="text-gray-400 uppercase">Expire Date</p>
              <input
                type="text"
                placeholder="mm/yyyy"
                onChange={(e) => setExpire(e.target.value)}
                value={expire}
                required
                className="outline-none border rounded px-2 border-gray-300 w-full h-10 my-1"
              />
            </div>
            <div className="">
              <p className="text-gray-400 uppercase">CVC</p>
              <input
                type="text"
                placeholder="***"
                onChange={(e) => setCvv(e.target.value)}
                value={cvv}
                required
                className="outline-none border rounded px-2 border-gray-300 w-full h-10 my-1"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="uppercase text-white bg-orange-500 w-full mt-4 h-12 rounded font-medium cursor-pointer"
        >
          Add & Make Payment
        </button>
      </form>
    </div>
  );
};

export default AddCard;
