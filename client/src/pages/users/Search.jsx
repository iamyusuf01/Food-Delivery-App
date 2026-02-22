import React, { useContext, useMemo } from "react";
import SearchInput from "../../components/users/Search";
import { FaChevronLeft, FaRupeeSign } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import SearchShimmer from "../../components/lib/SearchShimmer";

const Search = () => {
  const { allRestaurants, allDish, navigate, menuOptions, loading } =
    useContext(AuthContext);

  const topRestaurants = useMemo(
    () => allRestaurants?.slice(0, 5) || [],
    [allRestaurants]
  );

  const topDishes = useMemo(
    () => allDish?.slice(0, 5) || [],
    [allDish]
  );
  if (loading) {
  return <SearchShimmer />;
}

  return (
    <div className="p-6 min-h-screen font-ui">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div
            onClick={() => navigate(-1)}
            className="bg-gray-500/30 p-3 rounded-full cursor-pointer hover:bg-gray-400/40 transition"
          >
            <FaChevronLeft />
          </div>
          <p className="text-xl font-semibold text-gray-800">Search</p>
        </div>

        <div className="bg-black p-2 rounded-full cursor-pointer">
          <IoBagHandle size={24} className="text-white" />
        </div>
      </div>
      <div className="mt-4">
        <SearchInput />
      </div>
      {/* <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-700">
          Recent Keywords
        </h3>

        <div className="flex gap-4 mt-3 overflow-x-auto whitespace-nowrap no-scrollbar">
          {menuOptions?.map((item) => (
            <div
              key={item.label}
              onClick={() => navigate(`/search/${item.value}`)}
              className="px-4 py-2 rounded-full bg-gray-600/10 shadow-md text-indigo-950 font-medium cursor-pointer hover:bg-gray-200 transition"
            >
              {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
            </div>
          ))}
        </div>
      </div> */}
      {topRestaurants.length > 0 ? (
        <div className="mt-8">
          <h6 className="font-semibold text-lg text-gray-700 mb-3">
            Suggested Restaurants
          </h6>

          {topRestaurants.map((res) => (
            <Link
              to={`/all-restaurants/${res._id}`}
              key={res._id}
              className="flex gap-3 mb-4"
            >
              <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={res.avatar || "/fallback.png"}
                  alt={res.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center gap-1">
                <p className="text-base font-semibold text-gray-800">
                  {res.name}
                </p>

                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <IoIosStar className="text-orange-500" size={16} />
                  <span>{res.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center bg-gray-200 rounded mt-8">
          <h4 className="text-lg font-semibold text-gray-700">
            Restaurant Not Found
          </h4>
        </div>
      )}
      {topDishes.length > 0 ? (
        <div className="mt-8">
          <h6 className="font-semibold text-lg text-gray-700 mb-3">
            Suggested Dishes
          </h6>

          {topDishes.map((dish) => (
            <div
              key={dish._id}
              onClick={() =>
                navigate(
                  `/food-details/${dish._id}`
                )
              }
              className="flex gap-3 mb-4 cursor-pointer"
            >
              <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={dish.image || "/fallback.png"}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-center gap-1">
                <p className="text-sm font-semibold text-gray-800">
                  {dish.name}
                </p>

                <div className="flex items-center gap-1 text-sm text-green-600 font-medium">
                  <FaRupeeSign size={12} />
                  {Number(dish.price).toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-32 flex items-center justify-center bg-gray-200 rounded mt-8">
          <h4 className="text-lg font-semibold text-gray-700">
            Dishes Not Found
          </h4>
        </div>
      )}
    </div>
  );
};

export default Search;