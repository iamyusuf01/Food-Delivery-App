import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaPlus } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Filter from "../../components/users/Filter";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import ShimmerCard from "../../components/lib/ShimmerCard";
import MenuShimmer from "../../components/lib/MenuShimmer";

const tabs = ["All", "Burger", "Pizza", "Sandwich"];

const RestaurantView = () => {
  const navigate = useNavigate();
  const { restaurants, backendUrl, loading } = useContext(AuthContext);

  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [active, setActive] = useState("All");
  const [menuLoading, setMenuLoading] = useState(true);

  const restaurant = restaurants.find((r) => r._id?.toString() === id);

  const fetchAllMenu = async () => {
    try {
      setMenuLoading(true);
      const { data } = await axios.get(backendUrl + `/api/menu/all-menu`);
      if (data.success) {
        setMenu(data.menu);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMenu();
  }, []);

  if (loading || !restaurant) {
    return (
      <div className="p-6">
        <ShimmerCard />
      </div>
    );
  }

  return (
    <div className="p-6 relative font-ui">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft />
          </button>
          <h2 className="text-xl font-medium">Restaurant View</h2>
        </div>

        <div
          className="w-10 h-10 cursor-pointer rounded-full p-3 bg-gray-200"
          onClick={() => setOpen(true)}
        >
          <HiOutlineDotsHorizontal />
        </div>
      </div>
      <div className="my-4">
        <img
          src={restaurant.avatar}
          alt={restaurant.name}
          className="w-full h-44 bg-gray-200 rounded-xl object-cover"
          onError={(e) => (e.target.src = "/fallback.png")}
        />

        <h2 className="pt-2 text-xl font-medium">{restaurant.name}</h2>

        <p className="py-2 text-sm text-gray-600">{restaurant.description}</p>

        <div className="flex gap-12 items-center py-2">
          <div className="flex items-center gap-2">
            <FaRegStar className="text-orange-500" />
            <p className="font-medium text-lg">{restaurant.rating || 0}</p>
          </div>

          <div className="flex items-center gap-2">
            <TbTruckDelivery className="text-orange-500" />
            <p>
              {restaurant.deliveryFee > 0
                ? `₹${restaurant.deliveryFee}`
                : "Free"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineAccessTime className="text-orange-500" />
            <p>{restaurant.deliveryTime} Min</p>
          </div>
        </div>
      </div>
      <div className="pt-4 grid grid-cols-4 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`border h-8 rounded-2xl ${
              active === tab ? "bg-orange-400 text-white" : "text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 py-6">
        {menuLoading
          ? Array.from({ length: 4 }).map((_, i) => <MenuShimmer key={i} />)
          : menu.map((menuItem) => (
              <div
                key={menuItem._id}
                className="rounded-2xl shadow-lg px-4 py-4"
              >
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  className="w-full h-28 rounded-2xl bg-gray-200 object-cover"
                />

                <div>
                  <p className="text-xl font-medium pt-2">{menuItem.name}</p>
                  <p className="text-gray-600">
                    {menuItem?.restaurant?.name}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="font-bold">₹{menuItem.price}</p>

                  <button
                    className="w-8 h-8 rounded-full bg-orange-400"
                    onClick={() => navigate(`/food-details/${menuItem._id}`)}
                  >
                    <FaPlus className="mx-auto text-white" />
                  </button>
                </div>
              </div>
            ))}
      </div>
      {open && (
        <div className="absolute p-6 rounded-xl right-6 left-6 top-10 bg-white shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl">Filter your search</h2>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 rounded-full p-3 bg-gray-200"
            >
              <RxCross2 />
            </button>
          </div>
          <Filter />
        </div>
      )}
    </div>
  );
};

export default RestaurantView;
