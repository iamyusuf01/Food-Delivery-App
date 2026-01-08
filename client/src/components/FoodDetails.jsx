import { useParams } from "react-router";
import { restaurants } from "../assets/assets";
import { FaChevronLeft, FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import AddToCart from "./AddToCart";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const FoodDetails = () => {
  const { id } = useParams();
  const { navigate, restaurants } = useContext(AuthContext);
  const [menuByRestaurant, setMenuByRestaurant] = useState([]);

  // const restaurant = restaurants?.find(
  //   (resItem) => resItem?._id?.toString() === id
  // );
  // console.log(restaurant)
  console.log(menuByRestaurant);

  const fetchMenuByRestaurant = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/menu/get-menu/${id}`
      );
      if (data.success) {
        setMenuByRestaurant(data.menu);
      }
      // console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMenuByRestaurant();
    }
  }, [id]);

  return (
    <div className=" overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-4 ">
          <button
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft />
          </button>
          <h2 className="font-medium">Details</h2>
        </div>
        <div className="my-4">
          <div className="py-4" id="_id">
            <div className="">
              <div>
                <img
                  src={menuByRestaurant?.image}
                  className=" bg-gray-300 h-32 w-full rounded-xl"
                />
                <p className="mt-6 pl-6 border border-gray-300 rounded-full w-2/3   h-8">
                  {restaurant?.name}
                </p>
                <h2 className="pt-2">{menuByRestaurant?.name}</h2>
              </div>
              <div className="py-2">
                <div>
                  {/* <h2 className="pt-2">{item?.name}</h2> */}
                  <p className="pt-2"> {menuByRestaurant?.description}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <p>
                  <FaRegStar size={20} color="orange" />
                </p>
                <p>{restaurant?.rating}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>
                  <TbTruckDelivery size={22} color="orange" />
                </p>
                <p>{restaurant?.location.city}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>
                  <MdOutlineAccessTime size={22} color="orange" />
                </p>
                <p>{restaurant?.deliveryTime} Min</p>
              </div>
            </div>
          </div>
        </div>
        {/*Sizes  */}
        <div className="flex gap-6 items-center">
          <h2 className="uppercase">Size: </h2>
          <div className="flex gap-4">
            <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
              10"
            </p>
            <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
              14"
            </p>
            <p className=" w-10 h-10 rounded-full text-center pt-1.5 bg-gray-200">
              16"
            </p>
          </div>
        </div>
      </div>

      {/* Add To Card */}
      <AddToCart
        restaurants={restaurant}
        // menu={item}
      />
    </div>
  );
};

export default FoodDetails;
