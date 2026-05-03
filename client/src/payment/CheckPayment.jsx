import React from "react";
import { useNavigate, useLocation } from "react-router";
const CheckPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId || "N/A";

  return (
    <div className="p-6 font-ui flex flex-col min-h-screen justify-between">
      
      {/* Center Content */}
      <div className="flex flex-col justify-center items-center flex-grow">
        
        {/* Image */}
        <div className="bg-gray-100 w-40 h-40 rounded-2xl flex items-center justify-center shadow-md">
          <img
            // src={successImg}
            alt="Payment Success"
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Text */}
        <div className="text-center pt-6">
          <h2 className="text-2xl font-semibold text-green-600">
            Payment Successful 🎉
          </h2>
          <p className="py-2 text-gray-600">
            You successfully made a payment.
            <br />
            Enjoy our service!
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Order ID: {orderId}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        
        {/* Go Home */}
        <button
          onClick={() => navigate("/")}
          className="w-1/2 h-12 rounded font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          Go Home
        </button>

        {/* Track Order */}
        <button
          onClick={() => navigate("/orders")}
          className="w-1/2 h-12 rounded font-medium bg-orange-500 text-white hover:bg-orange-600 transition"
        >
          Track Order
        </button>

      </div>
    </div>
  );
};

export default CheckPayment;