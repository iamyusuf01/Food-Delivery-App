import React, { useState } from "react";
import { BgImages } from "../assets/assets.js";
import { useNavigate } from "react-router";
import { FaChevronLeft } from "react-icons/fa6";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
    const navigate = useNavigate()


  const handleClick = (e) => {
    e.preventDefault();
    alert("Login Successfull");
    navigate('/verification')

  };
  return (
    <div className="justify-center items-center max-h-screen overflow-hidden">
      <div className=" bg-[#1E1E2E]">
        <div className=" text-white pb-6">
          <div className="h-36">
            <img className="w-full" src={BgImages.Background} alt="" />
            <div className="border w-12 h-12 rounded-full absolute left-5 top-3 p-4 bg-white">
                <FaChevronLeft color="black" className="cursor-pointer" onClick={() => navigate('/login')}/>
            </div>
          </div>
          <div className="text-center mt-6 ">
            <h2 className="font-bold text-3xl">Forget Password</h2>
            <p className="text-sm pt-4">Please sign in to your existing account</p>
          </div>
        </div>
        <div className="bg-white rounded-t-3xl p-6">
          <form typeof="submit">
            <div className=" grid rounded-t-full">
              <div className="mt-4">
                <p className="uppercase">Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                  type="email"
                  placeholder="enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                onClick={handleClick}
                className="uppercase mt-12 bg-amber-500 h-12 rounded text-sm"
              >
                Send Code
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
