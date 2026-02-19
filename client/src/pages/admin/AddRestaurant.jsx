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
  const [description, setDescription] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [cuisines, setCuisines] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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

    if (!avatar) {
      toast.error("Please upload avatar");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("deliveryTime", deliveryTime);
      formData.append("deliveryFee", deliveryFee);
      formData.append("street", street);
      formData.append("city", city);

      const cuisineArray = cuisines.split(",").map((item) => item.trim());
      cuisineArray.forEach((c) => formData.append("cuisines", c));

      formData.append("avatar", avatar);

      const { data } = await axios.post(
        backendUrl + "/api/restaurant/add",
        formData,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setDeliveryTime("");
        setDeliveryFee("");
        setCuisines("");
        setStreet("");
        setCity("");
        setAvatar(null);
        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="p-6 bg-white font-ui">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            className="w-10 h-10 rounded-full p-3 bg-gray-300 text-black"
            to={"/admin"}
          >
            <FaChevronLeft />
          </Link>
          <h2 className="text-xl">Add Restaurant</h2>
        </div>
      </div>

      <form onSubmit={ClickToAddRestaurant}>
        <div className="py-6 flex flex-col items-center">
          <input
            onChange={handleAvatarChange}
            type="file"
            ref={fileInputRef}
            accept="image/*"
            id="uploadItem"
            className="hidden"
          />
          <label htmlFor="uploadItem">
            <div className="w-32 h-32 rounded-xl relative shadow-lg">
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" />
              ) : (
                <BsCloudUpload
                  className="absolute left-10 top-10"
                  size={52}
                  color="blue"
                />
              )}
            </div>
          </label>
          <p className="uppercase pt-4">Upload Avatar</p>
        </div>
        <div className="py-3">
          <p className="uppercase">Restaurant Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Add Resstaurant Name"
            required
            className="border border-gray-400 rounded px-2 py-1 w-full mt-2"
          />
        </div>
        <div className="py-3">
          <p className="uppercase">Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            placeholder="Add Description"
            className="w-full mt-2 px-3 py-2 border border-gray-400 rounded-md"
          />
        </div>
        <div className="py-3">
          <p className="uppercase">Cuisines (comma separated)</p>
          <input
            value={cuisines}
            onChange={(e) => setCuisines(e.target.value)}
            type="text"
            placeholder="Indian, Chinese"
            required
            className="border border-gray-400 rounded px-2 py-1 w-full mt-2"
          />
        </div>
        <div className="py-3">
          <p className="uppercase">Delivery Time (minutes)</p>
          <input
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            type="number"
            placeholder="eg - 30"
            required
            className="border border-gray-400 rounded px-2 py-1 w-full mt-2"
          />
        </div>

        {/* Delivery Fee */}
        <div className="py-3">
          <p className="uppercase">Delivery Fee</p>
          <input
            value={deliveryFee}
            onChange={(e) => setDeliveryFee(e.target.value)}
            type="number"
            placeholder="eg- 49"
            className="border border-gray-400 rounded px-2 py-1 w-full mt-2"
          />
        </div>
        <div className="py-3">
          <p className="uppercase">Street</p>
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            placeholder="Add Your Street"
            required
            className="border border-gray-400 rounded px-2 py-1 w-full mt-2"
          />
        </div>
        <div className="py-3">
          <p className="uppercase">City</p>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            required
            placeholder="Add Your City"
            className="border border-gray-400 rounded px-2 py-1 w-full mt-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full my-6 h-12 rounded-xl bg-orange-500 text-white uppercase text-lg disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
