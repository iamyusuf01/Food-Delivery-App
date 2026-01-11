import React, { useContext, useEffect, useRef, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router";
import { BsCloudUpload } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import axios from "axios";
// import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const AddItem = () => {
  // const { token } = useContext(AuthContext);
  const basic = [
    { name: "Salt", image: "" },
    { name: "Chicken", image: "" },
    { name: "Onion", image: "" },
    { name: "Garlic", image: "" },
    { name: "Poppers", image: "" },
    { name: "Ginger", image: "" },
  ];

  const fruit = [
    { name: "Salt", image: "" },
    { name: "Chicken", image: "" },
    { name: "Onion", image: "" },
    { name: "Garlic", image: "" },
    { name: "Poppers", image: "" },
    { name: "Ginger", image: "" },
  ];

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const ClickAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("avatar", image);
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/menu/add-item",
        formData,
        { withCredentials: true }
        // { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (data.success) {
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
        setPreview(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        toast.success(data.message);
        navigate("/admin/my-food-list");
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
    <div className="p-6 overflow-hidden">
      <div className=" flex justify-between items-center  max-h-screen rounded-2xl">
        <div className="flex items-center gap-4 ">
          <Link
            className="w-10 h-10 rounded-full p-3 bg-gray-300 text-black"
            to={"/admin"}
          >
            <FaChevronLeft />
          </Link>
          <h2 className="text-xl">My Food List</h2>
        </div>
        <button className="uppercase text-orange-500 font-medium">Reset</button>
      </div>
      <div>
        <form onSubmit={ClickAddItem}>
          <div className="pt-6 py-4">
            <p className="uppercase">Item Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Food Name"
              className="border border-gray-400 rounded px-2 outline-none mt-2 py-1 w-full"
            />
          </div>
          <div className="py-2">
            <p className="uppercase pb-4">Upload Photo</p>
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
                {preview && <img src={preview} />}
                <BsCloudUpload
                  className="absolute left-10 top-10 "
                  size={52}
                  color="blue"
                />
              </div>
            </label>
          </div>
          <div className="py-4">
            <p className="uppercase text-xl">Price</p>
            <div className="flex justify-between items-center">
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                type="number"
                placeholder="$50"
                className="border w-32 border-gray-400 rounded px-2 outline-none mt-2 py-1"
              />
              <div className="flex items-center gap-2 mt-2">
                {/* <input
                  type="checkbox"
                  className="border border-gray-400 rounded w-6 h-6 "
                /> */}
                {/* <p className="pb-1">Pick up</p> */}
              </div>
              <div className="flex gap-2 items-center mt-2">
                {/* <input
                  type="checkbox"
                  className="border border-gray-400 rounded w-6 h-6 bg-orange-400"
                /> */}
                {/* <p className="pb-1">Delivery</p> */}
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="uppercase text-xl">Ingriedents</h2>
            <div className="">
              <div className="flex justify-between items-center">
                <p className="text-xl py-1">Basic</p>
                <div className="flex items-center gap-2">
                  <p>See All</p>
                  <FaAngleDown />
                </div>
              </div>
              {/* <div className="grid grid-cols-6 ">
                {basic.map((item, basic) => (
                  <div className="" key={basic}>
                    <ul className="py-2  text-center ">
                      <li className="border w-14 h-14 mx-auto rounded-full py-3">
                        icon
                      </li>
                      <li className="py-1">{item.name}</li>
                    </ul>
                  </div>
                ))}
              </div> */}
            </div>
            <div className="py-4">
              <div className="flex justify-between items-center">
                <p className="text-xl py-1">Fruit</p>
                <div className="flex items-center gap-2 ">
                  <p className="py-1">See All</p>
                  <FaAngleDown />
                </div>
              </div>
              {/* <div className="grid grid-cols-6 gap-4 items-center text-center pt-2 ">
                {fruit.map((item, fruit) => (
                  <div className="" key={fruit}>
                    <ul className="text-center ">
                      <li className="border w-14 h-14 mx-auto rounded-full text-center py-3">
                        icon
                      </li>
                      <li className="py-1">{item.name}</li>
                    </ul>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="uppercase text-xl">Details</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              minLength={6}
              className="border border-gray-400 rounded-md w-full h-20 my-2"
            />
          </div>
          <button
            type="submit"
            className="text-center w-full my-4 h-12 rounded-xl bg-orange-500 text-white uppercase text-xl"
          >
            Save Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
