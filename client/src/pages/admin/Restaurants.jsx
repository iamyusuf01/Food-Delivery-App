import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Restaurants = () => {
  const { restaurants, setRestaurants, backendUrl, token } = useContext(AuthContext);

  const handleClickDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/restaurant/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (data.success) {
        setRestaurants((prev) => prev.filter((r) => r.id !== id))
        toast.success(data.message);
        // console.log(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 font-ui h-screen">
      <h2 className="text-lg">All Restaurants</h2>

      <div className="flex flex-col gap-4 py-6">
        {restaurants.map((item) => (
          <div key={item._id} className="shadow px-2">
            <h1 className="text-lg">{item.name}</h1>

            <div className="flex justify-between items-center">
              <div className="flex gap-4 py-1">
                <p className="text-sm">{item?.address?.city}</p>
                <p className="text-sm">{item?.address?.street}</p>
              </div>

              <button onClick={() => handleClickDelete(item._id)}>
                <MdDelete
                  size={20}
                  className="text-red-600 cursor-pointer"
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;