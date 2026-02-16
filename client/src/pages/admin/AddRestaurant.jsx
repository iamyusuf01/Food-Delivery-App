import React, { useContext, useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { BsCloudUpload } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AddRestaurant = () => {
  const { backendUrl } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
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

  const ClickToAddRestaurant = async (e) => {
    e.preventDefault();

    setLoading(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("deliveryTime", deliveryTime);
    if (avatar) formData.append("avatar", avatar);

    try {
      const { data } = await axios.post(
        backendUrl + "/api/restaurant/add",
        formData,
        { withCredentials: true },
      );
      if (data.success) {
        setName("");
        setDescription("");
        setDeliveryTime("");
        setAvatar(null);
        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success(data.message);
        navigate("/admin");
        console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  return (
    <div className="p-6 bg-white overflow-hidden font-ui">
      <div className=" flex justify-between items-center  max-h-screen rounded-2xl">
        <div className="flex items-center gap-4 ">
          <Link
            className="w-10 h-10 rounded-full p-3 bg-gray-300 text-black"
            to={"/admin"}
          >
            <FaChevronLeft />
          </Link>
          <h2 className="text-xl">Add Restaurant</h2>
        </div>
        {/* <button className="uppercase text-orange-500 font-medium">Reset</button> */}
      </div>
      <div>
        <form onSubmit={ClickToAddRestaurant}>
          <div className="py-6 flex flex-col justify-center items-center">
            <input
              onChange={handleAvatarChange}
              type="file"
              ref={fileInputRef}
              accept="image/*"
              id="uploadItem"
              placeholder="Enter Food Name"
              className="border hidden border-gray-200 rounded px-2 outline-none mt-2 py-1 w-full"
            />
            <label htmlFor="uploadItem" className="">
              <div className="w-32 h-32 rounded-xl relative text-center mt-1  shadow-lg">
                {preview ? (
                  <img src={preview} className="w-full h-full object-cover" />
                ) : (
                  <BsCloudUpload
                    className="absolute left-10 top-10 "
                    size={52}
                    color="blue"
                  />
                )}
              </div>
            </label>
            <p className="uppercase pt-4">Upload Avatar</p>
          </div>
          <div className="pt-6 py-4">
            <p className="uppercase">Restaurant Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              required
              placeholder="add restaurant name"
              className="border border-gray-400 rounded px-2 outline-none mt-2 py-1 w-full"
            />
          </div>
          <div className="py-4 flex flex-col gap-6">
            <div>
              <p className="uppercase">Description</p>
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add description"
                  rows={4}
                  required
                  className="w-full mt-2 px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                />
              </div>
            </div>
            <div>
              <p className="uppercase">Delivery Time</p>
              <div>
                <input
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  value={deliveryTime}
                  type="text"
                  required
                  placeholder="eg: 20 - 30 Min"
                  className="border w-full border-gray-400 rounded px-2 outline-none mt-2 py-1"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-center w-full my-4 h-12 rounded-xl bg-orange-500 text-white uppercase text-xl"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
