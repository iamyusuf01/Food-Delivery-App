import React, { useContext, useState } from "react";
import { BgImages } from "../assets/assets.js";
import { useNavigate } from "react-router";
import { FaChevronLeft } from "react-icons/fa6";
import { AuthContext } from "../context/AuthContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSend, setIsEmailSend] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);

  const inputRefs = React.useRef([]);
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.lenght > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/send-reset-otp",
        { email }
      );
      data.success ? toast.success(data.success) : toast.error(data.message);
      data.success && setIsEmailSend(true) && setIsLoggedIn(true);
      console.log(data)
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmit(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/change-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="justify-center items-center max-h-screen overflow-hidden">
      <div className=" bg-[#1E1E2E]">
        <div className=" text-white pb-6">
          <div className="h-36">
            <img className="w-full" src={BgImages.Background} alt="" />
            <div className="border w-12 h-12 rounded-full absolute left-5 top-8 p-4 bg-white">
              <FaChevronLeft
                color="black"
                className="cursor-pointer"
                onClick={() => navigate("/login")}
              />
            </div>
          </div>
          {/* Email Text */}
          {!isEmailSend && (
            <div className="text-center mt-6 ">
              {" "}
              <h2 className="font-bold text-3xl">Forget Password</h2>
              <p className="text-sm pt-4">
                Enter your registered email address
              </p>
            </div>
          )}
          {!isOtpSubmit && isEmailSend && (
            <div className="text-center mt-6 ">
              {" "}
              <h2 className="font-bold text-3xl">Forget Password OTP</h2>
              <p className="text-sm pt-4">
                Enter the OTP
              </p>
            </div>
          )}
          {isOtpSubmit && isEmailSend && (
            <div className="text-center mt-6 ">
              {" "}
              <h2 className="font-bold text-3xl">New Password</h2>
              <p className="text-sm pt-4">
                Enter the new password below
              </p>
            </div>
          )}
        </div>
        <div className="bg-white rounded-t-3xl p-6">
          {/* Enter Email id */}
          {!isEmailSend && (
            <form onSubmit={onSubmitEmail}>
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
                  className="uppercase mt-12 bg-amber-500 h-12 rounded text-sm"
                >
                  Send Code
                </button>
              </div>
            </form>
          )}
          {/* Otp Input form */}
          {!isOtpSubmit && isEmailSend && (
            <form onSubmit={onSubmitOtp}>
              <div className=" grid rounded-t-full">
                <div className="mt-4">
                  <div className="flex justify-between">
                    <p className="uppercase">Code</p>
                    <p className="">Resend</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    {Array(4)
                      .fill(0)
                      .map((_, index) => (
                        <input
                          className="w-12 h-12  text-center text-xl rounded-md"
                          key={index}
                          type="text"
                          maxLength="1"
                          required
                          ref={(e) => (inputRefs.current[index] = e)}
                          onInput={(e) => handleInput(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                      ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="uppercase mt-12 bg-amber-500 h-12 rounded text-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          )}{" "}
          {isOtpSubmit && isEmailSend && (
            <form onSubmit={onSubmitNewPassword}>
              <div className=" grid rounded-t-full">
                <div className="mt-4">
                  <p className="uppercase">New Password</p>
                  <input
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                    type="password"
                    placeholder="enter new password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="uppercase mt-12 bg-amber-500 h-12 rounded text-sm"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
