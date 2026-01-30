import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaPaypal, FaPlus } from "react-icons/fa";
import { PiHandCoins } from "react-icons/pi";
import { RiVisaLine } from "react-icons/ri";
import { SiMastercard } from "react-icons/si";
import Card from "../../assets/Card.png";
import { useNavigate } from "react-router";

const Payment = () => {
  const [method, setMethod] = useState("");
  const [savedCard, setSavedCard] = useState(null);
  const navigate = useNavigate();

  const PaymentMethods = [
    { title: "Cash", icon: PiHandCoins, color: "text-orange-500" },
    { title: "Visa", icon: RiVisaLine, color: "text-blue-500" },
    { title: "Mastercard", icon: SiMastercard, color: "text-orange-500" },
    { title: "PayPal", icon: FaPaypal, color: "text-blue-500" },
  ];

  useEffect(() => {
    const card = localStorage.getItem("savedCard");
    if (card) {
      setSavedCard(JSON.parse(card));
    }
  }, []);

  return (
    <div className="p-6 font-ui">
      <div className="flex gap-4 items-center">
        <div
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
        >
          <FaChevronLeft />
        </div>
        <h2 className="text-xl">Payment</h2>
      </div>
      <div className="flex gap-2">
        {PaymentMethods.map(({ title, icon: Icon, color }) => (
          <button
            key={title}
            onClick={() => setMethod(title)}
            className="w-full grid justify-between pt-6"
          >
            <div
              className={`rounded py-4 px-8 ${
                method === title
                  ? "border-2 border-orange-400 rounded-md"
                  : "bg-gray-200"
              }`}
            >
              <Icon size={20} className={color} />
            </div>
            <p className="text-center">{title}</p>
          </button>
        ))}
      </div>
      {method && method !== "Cash" && (
        <>
          {savedCard && savedCard.type === method ? (
            <div className="my-8 bg-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-2">
                {savedCard.type} Card
              </p>

              <p className="text-lg font-medium tracking-widest">
                **** **** **** {savedCard.number.slice(-4)}
              </p>

              <div className="flex justify-between mt-4 text-sm">
                <span>{savedCard.name}</span>
                <span>{savedCard.expire}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center my-8 bg-gray-200 rounded-xl text-center">
              <img className="rounded-xl w-52 mt-8" src={Card} />
              <div className="py-4">
                <h2 className="font-medium">No card added</h2>
                <p className="text-gray-500 text-sm">
                  You can add a card and save it for later
                </p>
              </div>
            </div>
          )}
          <div
            onClick={() =>
              navigate("/payment/add-card", {
                state: { method },
              })
            }
            className="flex justify-center items-center border rounded border-gray-300 h-12 gap-2 cursor-pointer"
          >
            <FaPlus className="text-orange-500" />
            <p className="uppercase text-orange-400 text-sm">
              {savedCard?.type === method && "Add New"}
            </p>
          </div>
        </>
      )}
      <div className="pt-8">
        <div className="flex gap-4">
          <p>Total:</p>
          <p>$40</p>
        </div>
        <button
          disabled={!method}
          className={`uppercase w-full mt-4 h-12 rounded font-medium
            ${
              method ? "bg-orange-500 text-white" : "bg-gray-300 text-gray-500"
            }`}
        >
          Pay & Confirm
        </button>
      </div>
    </div>
  );
};

export default Payment;
