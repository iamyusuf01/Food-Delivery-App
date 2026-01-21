import React, { useContext } from "react";
import Navbar from "../../components/users/Navbar";
import Categories from "../../components/users/Categories";
import Search from "../../components/users/Search";
import Restaurants from "../../components/users/Restaurants";
import Offers from "../../components/users/Offers";
import { useMatch } from "react-router-dom";

const Home = () => {
  const isAdminRoute = useMatch("/admin/*");

  return (
    <div className="relative ">
      <div className="p-6 flex flex-col gap-3">
        {!isAdminRoute && <Navbar />}
        <h2 className="text-sm pb-2">
          Hey Halal, <span className="font-medium">Good Afternoon</span>
        </h2>
        <Categories />
        <Restaurants />
      </div>
      <div className="absolute top-36 left-16 right-16">
        <Offers />
      </div>
    </div>
  );
};

export default Home;
