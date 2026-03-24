import React from "react";
import { restaurants } from "../../assets/assets";
import { FaChevronLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ShimmerCard from "../../components/lib/ShimmerCard";

const AllRestaurants = () => {
  const navigate = useNavigate();
  const { restaurants, loading } = useContext(AuthContext);

  return (
    <div className="p-6 font-ui">
      <div className="flex items-center gap-4 ">
        <button
          className="w-10 h-10 rounded-full p-3 bg-gray-200"
          onClick={() => navigate("/")}
        >
          <FaChevronLeft />
        </button>
        <h2 className="font-medium font-ui text-xl">Restaurants</h2>
      </div>

      <div className="flex flex-col">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          : restaurants.map((item, key) => (
              <Link
                to={`/all-restaurants/${item._id}`}
                key={key}
                className="py-4 my-2"
                id="_id"
              >
                <div className="">
                  <img
                    src={item.avatar}
                    // src=""
                    className=" bg-gray-400 h-44 w-full rounded-xl object-cover"
                  />
                  <h2 className="pt-1 font-medium font-ui text-xl">
                    {item.name}
                  </h2>
                  <p className="py-2 text-sm text-gray-600">
                    {item?.description}
                  </p>
                </div>
                <div className="flex gap-12 pb-4">
                  <div className="flex items-center gap-2">
                    <FaRegStar size={20} color="orange" />
                    <p className="font-medium">{item.rating > 0 ? `${item.rating}` : 4.5}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TbTruckDelivery size={22} color="orange" />
                    <p>
                      {item.deliveryFee > 0 ? `₹${item.deliveryFee}` : "Free"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p>
                      <MdOutlineAccessTime size={22} color="orange" />
                    </p>
                    <p>{item.deliveryTime} Min</p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
