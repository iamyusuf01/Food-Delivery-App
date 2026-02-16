import React, { useContext } from "react";
import { restaurants } from "../../assets/assets";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
const Restaurants = () => {
  const navigate = useNavigate();
  const { restaurants, OpenRestaurants } = useContext(AuthContext);

  if (!OpenRestaurants || !restaurants.length) return null;
  return (
    <div className="font-ui">
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
                src={item.avatar}
                alt={item.name}
                className="w-full h-44 bg-gray-200 rounded-xl object-cover"
                onError={(e) => (e.target.src = "/fallback.png")}
              />

              <h2 className="pt-2 font-medium font-ui text-xl">{item.name}</h2>
              <p className="py-2 text-sm text-gray-600">
              {item?.description}
            </p>
              {/* <div className="pt-1">
                {item?.menu?.map((item, index) => (
                  <div key={index} className="">
                    <p className="">{item.name}</p>
                  </div>
                ))}
              </div> */}
            </div>
            <div className="flex gap-12 pb-4">
              <div className="flex items-center gap-2">
                <FaRegStar size={20} color="orange" className="" />
                <p className="font-medium">{item?.rating}</p>
              </div>
              <div className="flex items-center gap-2">
                <TbTruckDelivery size={22} color="orange" />
                <p>Free</p>
              </div>
              <div className="flex items-center gap-2">
                <MdOutlineAccessTime size={22} color="orange" />
                <p>{item.deliveryTime}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
