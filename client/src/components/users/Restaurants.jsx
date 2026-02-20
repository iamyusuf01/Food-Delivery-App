import React, { useContext } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";
import ShimmerCard from "../../components/lib/ShimmerCard";

const Restaurants = () => {
  const navigate = useNavigate();
  const { restaurants, OpenRestaurants, loading } = useContext(AuthContext);

  return (
    <div className="font-ui">
      {!OpenRestaurants ||
        (restaurants.length === 0 && (
          <p className="text-gray-500 py-6">No open restaurants available.</p>
        ))}
      {!loading && (
        <div className="flex justify-between items-center">
          <h2 className="text-xl">Open Restaurants</h2>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/all-restaurants")}
          >
            <p>See All</p>
            <FaChevronRight size={16} />
          </div>
        </div>
      )}
      <div className="my-4 grid gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ShimmerCard key={index} />
            ))
          : restaurants.map((item) => (
              <Link
                to={`/restaurants/${item._id}`}
                key={item._id}
                className="py-6"
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-full h-44 bg-gray-200 rounded-xl object-cover"
                  onError={(e) => (e.target.src = "/fallback.png")}
                />

                <h2 className="pt-2 font-medium text-xl">{item.name}</h2>

                <p className="py-2 text-sm text-gray-600">
                  {item?.description}
                </p>

                <div className="flex gap-12 pb-4">
                  <div className="flex items-center gap-2">
                    <FaRegStar size={20} color="orange" />
                    <p className="font-medium">{item?.rating || 0}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <TbTruckDelivery size={22} color="orange" />
                    <p>
                      {item.deliveryFee > 0 ? `₹${item.deliveryFee}` : "Free"}
                    </p>
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
