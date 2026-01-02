import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Search from "../components/Search";
import Restaurants from "../components/Restaurants";
import Offers from "../components/Offers";
import { AuthContext } from "../context/AuthContext";
import Login from "../auth/Login";
import { redirect } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return (
    <div className="relative ">
      <div className="p-6 flex flex-col gap-3">
        <Navbar />
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
