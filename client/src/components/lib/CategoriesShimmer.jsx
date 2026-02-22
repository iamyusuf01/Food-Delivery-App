import React from "react";

const CategoriesShimmer = ({ count = 4 }) => {
  return (
    <div className="font-ui text-[18px] py-4 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-40 bg-gray-200 rounded" />
        
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-full flex gap-4 py-2 overflow-hidden whitespace-nowrap">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="flex shadow-md px-3 rounded-full gap-2 py-1 items-center"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="h-5 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesShimmer;