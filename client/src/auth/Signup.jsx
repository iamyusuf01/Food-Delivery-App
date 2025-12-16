import React, { useContext, useState } from "react";
import { BgImages } from "../assets/assets.js";
import { useNavigate } from "react-router";
import { FaChevronLeft } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";



const Signup = () => {
  const {backendUrl, setIsLoggedIn} = useContext(AuthContext)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [reTypePassword, setReTypePassword] = useState("");

      const navigate = useNavigate()


  const onClickHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true
      const {data} = await axios.post('http://localhost:4000/api/auth/register', {name, email, password}, {withCredentials: true})
      if(data.success){
        setIsLoggedIn(true)
        toast.success(data.message)
        navigate('/')
      } else {
        toast.error(data.message)
      }
      console.log(data)
    } catch (error) {
      toast.error(error.message)
      // console.log(error)
    }
  };
  return (
    <div className="justify-center items-center">
      <div className=" bg-[#1E1E2E]">
        <div className=" text-white pb-6">
          <div className="h-38">
            <img className="w-full" src={BgImages.Background} alt="" />
            <div className="border w-12 h-12 rounded-full absolute left-5 top-8 p-4 bg-white group">
                <FaChevronLeft color="black" className="cursor-pointer" onClick={() => navigate('/login')}/>
            </div>
          </div>
          <div className="text-center mt-6 ">
            <h2 className="font-bold text-3xl">Signup</h2>
            <p className="text-sm pt-4">Please sign up to get started</p>
          </div>
        </div>
        <div className="bg-white rounded-t-3xl p-4">
          <form onSubmit={onClickHandler}>
            <div className=" grid rounded-t-full">
              <div className="">
                <p className="uppercase">Name</p>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                  type="text"
                  placeholder="enter your name"
                  required
                />
              </div>
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
              {/* <div className="mt-4">
                <p className="uppercase">Re-Type Password</p>
                <input
                  // onChange={(e) => setReTypePassword(e.target.value)}
                  // value={reTypePassword}
                  className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                  type="password"
                  placeholder="enter your password"
                  required
                />
              </div> */}
              <button
                type="submit"
                className="uppercase mt-8 bg-amber-500 h-12 rounded text-sm"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
