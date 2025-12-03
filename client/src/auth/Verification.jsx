import React, { useState } from "react";
import { BgImages } from "../assets/assets.js";
import { useNavigate } from "react-router";
import { FaChevronLeft } from "react-icons/fa6";


const Verification = () => {
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    alert("Login Successfull");
    navigate("/login");
  };
  return (
    <div className="justify-center items-center max-h-screen overflow-hidden">
      <div className=" bg-[#1E1E2E]" >
        <div className=" text-white pb-6">
          <div className="h-36">
            <img className="w-full" src={BgImages.Background} />
            <div className="border w-12 h-12 rounded-full absolute left-5 top-3 p-4 bg-white">
              <FaChevronLeft color="black" className="" onClick={() => navigate('/forget-password')} />
            </div>
          </div>
          <div className="text-center mt-6 ">
            <h2 className="font-bold text-3xl">Verification</h2>
            <p className="text-sm pt-4">We have sent a code to your email</p>
            <p className="text-sm pt-1">example@gmail.com</p>
          </div>
        </div>
        <div className="bg-white rounded-t-3xl p-6">
          <form typeof="submit">
            <div className=" grid rounded-t-full">
              <div className="mt-4">
                <div className="flex justify-between">
                  <p className="uppercase">Code</p>
                  <p className="">Resend</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    className="outline-none text-center bg-gray-200 p-4  w-12 h-12"
                    required
                  />
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    className="outline-none text-center bg-gray-200 p-4 w-12 h-12"
                    required
                  />
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    className="outline-none text-center bg-gray-200 p-4 w-12 h-12"
                    required
                  />
                  <input
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    className="outline-none text-center bg-gray-200 p-4 w-12 h-12"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleClick}
                className="uppercase mt-12 bg-amber-500 h-12 rounded text-sm"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verification;
