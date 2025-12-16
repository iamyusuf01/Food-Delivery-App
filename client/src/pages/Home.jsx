import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Search from "../components/Search";
import Restaurants from "../components/Restaurants";
import Offers from "../components/Offers";
import { AuthContext } from "../context/AuthContext";
import Login from "../auth/Login";

const Home = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <div className="relative ">
      <div>
        <Navbar />
        <Search />
        <Categories />
        <Restaurants />
      </div>
      <div className="absolute top-36 left-16 right-16">
        <Offers />
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default Home;
