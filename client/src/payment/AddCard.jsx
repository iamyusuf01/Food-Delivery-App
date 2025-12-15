import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink } from "react-router";

const AddCard = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expire, setExpire] = useState("");
  const [otp, setOtp] = useState("");
  const [sendOtp, setSendOtp] = useState(false);

  // const AddCardDetails = {
  //   id: "1",
  //   name: "Md Yusuf",
  //   number: "123456789067890",
  //   expire: "12/2025",
  //   cvv: "123",
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number.length < 16) {
      alert("Invalid card number");
      return;
    }

    if (cvv.length !== 3) {
      alert("Invalid CVV");
      return;
    }

    console.log({
      name,
      number,
      expire,
      cvv,
    });

    alert("Payment Successful ✅");
  };

  const handleExpire = (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length >= 3) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }
  setExpire(value);
};


  // const navigate = useNavigate();
  // const AddToCard = () => {
  //   setName(AddCardDetails.name);
  //   setNumber(AddCardDetails.number);
  //   setExpire(AddCardDetails.expire);
  //   setCvv(AddCardDetails.cvv);
  // };


  return (
    <div className="p-6">
      <div className="flex gap-4 items-center">
        <NavLink
          to={"/payment"}
          className="w-10 h-10 rounded-full bg-gray-300 py-3 px-3"
        >
          <FaChevronLeft />
        </NavLink>
        <p className="text-xl">Add Card</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className=" min-h-screen pt-8">
          <div className="">
            <p className="text-gray-400 uppercase">Card Holder Name</p>
            <input
              type="text"
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
              maxLength={16}
              placeholder="enter card number"
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
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
                onChange={handleExpire }
                value={expire}
                required
                className="outline-none border rounded px-2 border-gray-300 w-full h-10 my-1"
              />
            </div>
            <div className="">
              <p className="text-gray-400 uppercase">CVC</p>
              <input
                type="password"
                maxLength={3}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                value={cvv}
                required
                className="outline-none border rounded px-2 border-gray-300 w-full h-10 my-1"
              />
            </div>
          </div>
        </div>

        <button
          // onClick={AddToCard}
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
