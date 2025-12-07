import React from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import Search from "../components/Search";
import Restaurants from "../components/Restaurants";
import Offers from "../components/Offers";

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <div >
        <Navbar />
        <Search />
        <Categories />
        <Restaurants />
      </div>
      <div className="absolute top-36 left-16">
        <Offers />
      </div>
    </div>
  );
};

export default Home;
