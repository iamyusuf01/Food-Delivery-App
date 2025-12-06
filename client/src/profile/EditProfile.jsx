import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router";

const EditProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [bio, setBio] = useState('')
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 ">
        <p
          className="w-10 h-10 rounded-full p-3 bg-gray-200"
          onClick={() => navigate("/profile/personal-info")}
        >
          <FaChevronLeft />
        </p>
        <h2 className="font-medium">Edit Profile</h2>
      </div>
      {/*  */}
      <div className="pt-10">
        <form>
          <div className="relative">
            <div className="w-30 h-30 rounded-full bg-orange-200 m-auto">
              <img />
            </div>
            <div className="absolute bg-orange-400 w-10 h-10 rounded-full p-2 left-1/2 top-22 ">
              <FiEdit2 size={24} color="white" />
            </div>
          </div>
          {/* Input Sections */}
          <div className="py-6">
            <div>
              <p className="uppercase">Full Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name}
                className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                placeholder="Enter your name"
                type="name"
              />
            </div>
            <div className="mt-4">
              <p className="uppercase">Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email}
                className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                placeholder="email@gmail.com"
                type="email"
              />
            </div>
            <div className="mt-4">
              <p className="uppercase">Phone Number</p>
              <input onChange={(e) => setPhone(e.target.value)} value={phone}
                className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                placeholder="408-841-0926"
                type="number"
              />
            </div>
            <div className="mt-4">
              <p className="uppercase">Bio</p>
              <textarea onChange={(e) => setBio(e.target.value)} value={bio}
                className="outline-none bg-gray-200 p-4 mt-1 w-full h-24 rounded"
                placeholder="I love fast food"
                typeof="areaText"
              />
            </div>
            <button type="submit" className="uppercase mt-8 bg-amber-500 h-12 rounded text-sm w-full">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
