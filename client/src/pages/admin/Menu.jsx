import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Menu = ({ closeSidebar }) => {
  const { isAdmin, isSeller, backendUrl, token } = useContext(AuthContext);
  const [hasRestaurant, setHasRestaurant] = useState(false);

  useEffect(() => {
    const checkRestaurant = async () => {
      try {
        const { data } = await axios.get(
          backendUrl + "/api/restaurant/my-restaurant",
          {
            headers: { Authorization: `Bearer${token}` },
            withCredentials: true,
          },
        );
        if (data.success) {
          setHasRestaurant(true);
        } 
      } catch (error) {
        toast.error(error.message);
      }
    };
    checkRestaurant()
  }, [token, isSeller, backendUrl]);
  return (
    <div>
      {isAdmin && (
        <ul className="flex flex-col gap-4 font-ui">
          <li
            onClick={closeSidebar}
            className=" cursor-pointer  px-2 bg-gray-200 py-2 rounded"
          >
            <Link
              to="/admin/all-users"
              className="flex justify-between items-center"
            >
              <p>Users</p>
              <FaChevronRight size={12} />
            </Link>
          </li>
          <li
            onClick={closeSidebar}
            className="cursor-pointer  px-2 bg-gray-200 py-2 rounded"
          >
            <Link
              to="/admin/all-restaurants"
              className="flex justify-between items-center "
            >
              <p>Restaurants</p>
              <FaChevronRight size={12} />
            </Link>
          </li>
        </ul>
      )}
      {!isAdmin && isSeller && (
        <ul className="flex flex-col gap-4 font-ui">
          {!hasRestaurant && (
            <li
              onClick={closeSidebar}
              className=" cursor-pointer  px-2 bg-gray-200 py-2 rounded"
            >
              <Link
                to="/seller/add-restaurant"
                className="flex justify-between items-center"
              >
                <p>Add Restaurant</p>
                <FaChevronRight size={12} />
              </Link>
            </li>
          )}
          <li
            onClick={closeSidebar}
            className="cursor-pointer  px-2 bg-gray-200 py-2 rounded"
          >
            <Link
              to="/seller/my-food-list"
              className="flex justify-between items-center "
            >
              <p>My Food Lists</p>
              <FaChevronRight size={12} />
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
