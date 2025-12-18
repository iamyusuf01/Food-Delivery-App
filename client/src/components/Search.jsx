import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const { restaurants } = useContext(AuthContext);
  const [input, setInput] = useState("");

  const handleSearchInput = () => {};

  return (
    <div className="mt-2">
      <h2 className="text-sm pb-2">
        Hey Halal, <span className="font-medium">Good Afternoon</span>
      </h2>

      <div className="flex items-center bg-gray-200 gap-2 h-10 rounded pl-2">
        <CiSearch size={20} />
        <input
          className="outline-none w-full px-2"
          type="search"
          value={input}
          placeholder="Search dishes, restauarants"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchInput();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Search;
