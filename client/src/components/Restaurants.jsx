import React, { useContext } from "react";
import { restaurants } from "../assets/assets";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
const Restaurants = () => {
  const navigate = useNavigate();
  const { restaurants, OpenRestaurants } = useContext(AuthContext);

  if (!OpenRestaurants || !restaurants.length) return null;
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h2 className="font-ui text-xl">Open Restaurants</h2>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/all-restaurants")}
        >
          <p className="font-ui">See All</p>
          <FaChevronRight size={16} />
        </div>
      </div>
      <div className="my-4">
        {restaurants.map((item, key) => (
          <Link
            to={`/restaurants/${item._id}`}
            key={key}
            className="py-6"
            id="_id"
          >
            <div className="">
              <img
                src={item.image}
                className=" bg-gray-400 h-36 w-full rounded-xl"
              />
              <h2 className="pt-1 font-medium font-ui text-xl">{item.name}</h2>
              <div className="pt-1">
                {item?.menu?.map((item, index) => (
                  <div key={index} className="">
                    <p className="">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-12 pb-4">
              <div className="flex items-center gap-2">
                <FaRegStar size={20} color="orange" className="" />
                <p className="font-medium">{item?.rating}</p>
              </div>
              <div className="flex items-center gap-2">
                <TbTruckDelivery size={22} color="orange" />
                <p>{item?.city}</p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineAccessTime size={22} color="orange" />
                <p>{item.deliveryTime} Min</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
