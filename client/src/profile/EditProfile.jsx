import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const updateAccountDetails = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("bio", bio);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const { data } = await axios.put(
        "http://localhost:4000/api/user/update-account",
        formData,
        { withCredentials: true },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data.success) {
        setName("");
        setEmail("");
        setBio("");
        setPhone("");
        setAvatar(null);
        setPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success(data.message);
        navigate("profile/personal-info");
        console.log(data)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
        <form onSubmit={updateAccountDetails}>
          <div className="relative">
            <input
              id="avatarUpload"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-orange-200 overflow-hidden m-auto">
                {preview ? (
                  <img
                    src={preview}
                    // alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Upload
                  </div>
                )}
              </div>
              <label
                htmlFor="avatarUpload"
                className="absolute bg-orange-400 w-10 h-10  cursor-pointer rounded-full p-2 left-1/2 top-26 "
              >
                <FiEdit2 size={24} color="white" />
              </label>
            </div>
          </div>
          {/* Input Sections */}
          <div className="py-6">
            <div>
              <p className="uppercase">Full Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                placeholder="Enter your name"
                type="name"
              />
            </div>
            <div className="mt-4">
              <p className="uppercase">Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                placeholder="email@gmail.com"
                type="email"
              />
            </div>
            <div className="mt-4">
              <p className="uppercase">Phone Number</p>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="outline-none bg-gray-200 p-4 mt-1 w-full rounded"
                placeholder="408-841-0926"
                type="number"
              />
            </div>
            <div className="mt-4">
              <p className="uppercase">Bio</p>
              <textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                className="outline-none bg-gray-200 p-4 mt-1 w-full h-24 rounded"
                placeholder="I love fast food"
                typeof="areaText"
              />
            </div>
            <button
              type="submit"
              className="uppercase mt-8 bg-amber-500 h-12 rounded text-sm w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
