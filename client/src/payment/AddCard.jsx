import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router";

const AddCard = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expire, setExpire] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const cardType = location.state?.method;

  const handleExpire = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpire(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (number.length !== 16) {
      alert("Invalid card number");
      return;
    }

    if (cvv.length !== 3) {
      alert("Invalid CVV");
      return;
    }

    const cardData = {
      type: cardType,
      name,
      number,
      expire,
    };
    localStorage.setItem("savedCard", JSON.stringify(cardData));
    navigate("/payment");
  };

  const isValid =
    name && number.length === 16 && cvv.length === 3 && expire.length === 5;

  return (
    <div className="h-screen flex flex-col p-6 font-ui bg-white">
      <div className="flex gap-4 items-center mb-6">
        <NavLink
          to="/payment"
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
        >
          <FaChevronLeft />
        </NavLink>
        <p className="text-xl">Add Card</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col justify-between"
      >
        <div>
          <div className="mb-3">
            <p className="text-gray-400 uppercase text-sm">Card Holder Name</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none border rounded px-2 border-gray-300 w-full h-10"
              required
            />
          </div>
          <div className="mb-3">
            <p className="text-gray-400 uppercase text-sm">Card Number</p>
            <input
              type="text"
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              value={number}
              onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
              className="outline-none border rounded px-2 border-gray-300 w-full h-10"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <p className="text-gray-400 uppercase text-sm">Expiry (MM/YY)</p>
              <input
                type="text"
                placeholder="MM/YY"
                value={expire}
                onChange={handleExpire}
                className="outline-none border rounded px-2 border-gray-300 w-full h-10"
                required
              />
            </div>

            <div className="w-1/2">
              <p className="text-gray-400 uppercase text-sm">CVV</p>
              <input
                type="password"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                className="outline-none border rounded px-2 border-gray-300 w-full h-10"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`uppercase w-full h-12 rounded font-medium mt-6
            ${
              isValid ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-500"
            }`}
        >
          Add & Make Payment
        </button>
      </form>
    </div>
  );
};

export default AddCard;
