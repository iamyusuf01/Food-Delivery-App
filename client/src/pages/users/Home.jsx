import React, { useContext } from "react";
import Navbar from "../../components/users/Navbar";
import Categories from "../../components/users/Categories";
import Search from "../../components/users/Search";
import Restaurants from "../../components/users/Restaurants";
import Offers from "../../components/users/Offers";
import { useMatch } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CategoriesShimmer from "../../components/lib/CategoriesShimmer";

const Home = () => {
  const { userData, loading } = useContext(AuthContext);

  const isAdminRoute = useMatch("/admin/*");

  const getGretting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="relative">
      <div className="p-6 flex flex-col gap-3">
        {!isAdminRoute && <Navbar />}

        {/* Greeting with safe loading */}
        <h2 className="text-sm pb-2 font-ui">
          {userData ? (
            <>
              Hey {userData.name?.trim()?.split(" ")[0]},{" "}
              <span className="font-medium">{getGretting()}</span>
            </>
          ) : (
            <div className="w-40 h-4 bg-gray-300 rounded animate-pulse">
              {/* {getGretting()} */}
            </div>
          )}
        </h2>
        {/* {loading ? <CategoriesShimmer /> : <Categories />} */}
        <Restaurants />
      </div>
      <div className="absolute top-36 left-16 right-16">{/* <Offers /> */}</div>
    </div>
  );
};

export default Home;
