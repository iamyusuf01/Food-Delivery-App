import React from "react";

const NavbarShimmer = () => {
  return (
    <div className="flex justify-between items-center animate-pulse">
      {/* Left */}
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

        <div className="space-y-2">
          <div className="h-3 w-16 bg-gray-300 rounded"></div>
          <div className="h-3 w-24 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <div className="h-8 w-16 bg-gray-300 rounded-xl"></div>
        <div className="h-8 w-16 bg-gray-300 rounded-xl"></div>
      </div>
    </div>
  );
};

export default NavbarShimmer;
