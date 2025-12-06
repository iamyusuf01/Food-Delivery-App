import React from "react";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className="p-6">
      <div className="pb-2">
        <h2 className="text-sm">
          Hey Halal, <span className="font-medium">Good Afternoon</span>
        </h2>
      </div>
      <div className="flex items-center bg-gray-200 gap-2 h-10 rounded pl-2">
        <CiSearch  size={20}/>
        <input
          className="outline-none w-full"
          type="text"
          placeholder="Search dishes, restauarants"
        />
      </div>
    </div>
  );
};

export default Search;
