import React from "react";

const MenuShimmer = () => {
  return (
    <div className="rounded-2xl shadow-lg px-4 py-4 animate-pulse bg-white">
      <div className="h-28 rounded-2xl mb-3 bg-gray-200"></div>
      <div className="h-4 w-2/3 mb-2 rounded bg-gray-200"></div>
      <div className="flex justify-between items-center mt-3">
        <div className="h-4 w-12 rounded bg-gray-200"></div>
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
      </div>

    </div>
  );
};

export default MenuShimmer;