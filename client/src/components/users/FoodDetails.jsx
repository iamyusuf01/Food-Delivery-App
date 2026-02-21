import { useParams } from "react-router";
import { FaChevronLeft, FaRegStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAccessTime } from "react-icons/md";
import AddToCart from "./AddToCart";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import FoodDetailsShimmer from "../../components/lib/FoodDetailsShimmer";

const FoodDetails = () => {
  const { itemId } = useParams();
  const { navigate, restaurants, backendUrl } = useContext(AuthContext);

  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTabs, setActiveTabs] = useState("");

  const tabs = ["10", "14", "16"];

  const fetchMenu = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${backendUrl}/api/menu/current-menu/${itemId}`
      );

      if (data.success) {
        setMenu(data.menu);
      } else {
        toast.error("Menu not found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (itemId) {
      fetchMenu();
    }
  }, [itemId]);

  // 🔥 AFTER hooks
  if (loading) return <FoodDetailsShimmer />;
  if (!menu) return null;

  return (
    <div className="overflow-hidden font-ui">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <button
            className="w-10 h-10 rounded-full p-3 bg-gray-200"
            onClick={() => navigate(-1)}
          >
            <FaChevronLeft />
          </button>
          <h2 className="font-medium text-lg">Details</h2>
        </div>

        <div className="my-4">
          <div className="py-2">
            <img
              src={menu?.image}
              alt={menu?.name}
              className="h-44 w-full rounded-xl object-cover bg-gray-400"
            />

            <p className="mt-4 px-6 border border-gray-300 rounded-full h-8 py-1 w-2/4 font-light">
              {menu?.restaurant?.name}
            </p>

            <p className="pt-2 text-lg font-medium">{menu?.name}</p>

            <p className="pb-1 text-sm text-gray-500">
              {menu?.description}
            </p>

            <div className="flex items-center gap-12 pt-2">
              <div className="flex items-center gap-2">
                <FaRegStar size={20} className="text-orange-400" />
                <p>{menu?.restaurant?.rating}</p>
              </div>

              <div className="flex items-center gap-2">
                <TbTruckDelivery size={22} color="orange" />
                <p>
                  {menu?.restaurant?.deliveryFee > 0
                    ? `₹${menu?.restaurant?.deliveryFee}`
                    : "Free"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <MdOutlineAccessTime size={22} color="orange" />
                <p>
                  {menu?.restaurant?.deliveryTime || 35} Min
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <h2 className="uppercase">Size:</h2>
          <div className="flex gap-4">
            {tabs.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTabs(item)}
                className={`w-10 h-10 rounded-full ${
                  activeTabs === item
                    ? "bg-orange-400 text-white"
                    : "bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <AddToCart restaurants={restaurants} menu={menu} />
    </div>
  );
};

export default FoodDetails;