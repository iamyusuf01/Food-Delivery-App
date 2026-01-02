import React, { useContext, useState } from "react";
import { BgImages } from "../assets/assets.js";
import { FaChevronLeft, FaFacebook } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaApple } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl, getUserData, setIsLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const onClickHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        setIsLoggedIn(true);
        getUserData()
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="justify-center items-center">
      <div className=" bg-[#1E1E2E]">
        <div className=" text-white   pb-6">
          <div className="h-38">
            <img className="w-full" src={BgImages.Background} alt="" />
            <div className="border w-12 h-12 rounded-full absolute left-5 top-8 p-4 bg-white">
              <FaChevronLeft
                color="black"
                className="cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-3xl">Login</h2>
            <p className="text-sm pt-4">
              Please sign in to your existing account
            </p>
          </div>
        </div>
        <div className="bg-white mt-4 rounded-t-3xl p-6">
          <form onSubmit={onClickHandler}>
            <div className=" grid rounded-t-full">
              <div className="">
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
              <div className="mt-4">
                <p className="uppercase">Password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                  type="password"
                  placeholder="enter your password"
                  required
                />
              </div>
              <div className="flex justify-between items-center mt-6 gap-6">
                <div className="flex gap-2">
                  <input type="checkbox" />
                  <p> Remember me</p>
                </div>
                <p
                  onClick={() => navigate("/forget-password")}
                  className="text-orange-400 cursor-pointer"
                >
                  Forget password
                </p>
              </div>
              <button
                type="submit"
                className="uppercase mt-6 bg-amber-500 h-12 rounded text-sm"
              >
                Log in
              </button>
            </div>
          </form>
          <div>
            <div className="pt-8 text-center">
              <p>
                Don't have an account?.{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="uppercase cursor-pointer text-orange-400"
                >
                  Sign up
                </span>
              </p>
              <p className="pt-4 text-xl">Or</p>
            </div>
            <div className="pt-2">
              <ul className="flex justify-center gap-8">
                <NavLink>
                  <li>
                    <FaFacebook size={36} />
                  </li>
                </NavLink>
                <NavLink>
                  <li>
                    <AiFillTwitterCircle size={36} />
                  </li>
                </NavLink>
                <NavLink>
                  <li>
                    <FaApple size={36} />
                  </li>
                </NavLink>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
