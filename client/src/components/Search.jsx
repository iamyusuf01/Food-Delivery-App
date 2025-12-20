import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const { restaurants, setRegisteredRestaurants, setAllDish } =
    useContext(AuthContext);
  const [input, setInput] = useState("");

  const allDishes = restaurants.map((res) => res.menu).flat();

  const handleSearch = () => {
    if (input) {
      const searchedRestaurants = restaurants.filter((res) =>
        res.name.toLowerCase().includes(input.toLowerCase())
      );
      const searchItems = allDishes.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase())
      );
      console.log(searchedRestaurants);
      setRegisteredRestaurants(searchedRestaurants);
      setAllDish(searchItems);
    } else {
      setRegisteredRestaurants(
        [...restaurants].sort((a, b) => b.rating - a.rating)
      );
      setAllDish(allDishes);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [input, setRegisteredRestaurants]);

  return (
    <div className="my-4">
      <div className="flex items-center bg-gray-200 gap-2 h-10 rounded pl-2">
        <CiSearch size={20} />
        <input
          className="outline-none w-full px-2"
          type="search"
          value={input}
          placeholder="Search dishes, restauarants"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
