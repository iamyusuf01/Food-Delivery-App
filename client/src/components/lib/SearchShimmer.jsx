import React from "react";

const SearchShimmer = () => {
  return (
    <div className="p-6 min-h-screen font-ui animate-pulse">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div className="h-6 w-24 bg-gray-300 rounded" />
        </div>
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      </div>
      <div className="mt-4">
        <div className="h-12 w-full bg-gray-300 rounded-lg" />
      </div>
      <div className="mt-6">
        <div className="h-5 w-40 bg-gray-300 rounded" />

        <div className="flex gap-4 mt-3">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="h-8 w-24 bg-gray-300 rounded-full" />
            ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="h-6 w-48 bg-gray-300 rounded mb-3" />

        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex gap-3 mb-4">
              <div className="w-24 h-16 bg-gray-300 rounded-lg" />
              <div className="flex flex-col justify-center gap-2 w-full">
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-3 w-1/4 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
      </div>

      <div className="mt-8">
        <div className="h-6 w-40 bg-gray-300 rounded mb-3" />

        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex gap-3 mb-4">
              <div className="w-24 h-16 bg-gray-300 rounded-lg" />
              <div className="flex flex-col justify-center gap-2 w-full">
                <div className="h-4 w-3/4 bg-gray-300 rounded" />
                <div className="h-3 w-1/4 bg-gray-300 rounded" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchShimmer;
