import React from "react";

const ShimmerCard = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 overflow-hidden my-4 animate-pulse">

      {/* Image */}
      <div className="h-44 rounded-xl mb-4 bg-gray-200"></div>

      {/* Title */}
      <div className="h-5 w-1/2 rounded mb-3 bg-gray-200"></div>

      {/* Description */}
      <div className="h-4 w-3/4 rounded mb-2 bg-gray-200"></div>
      <div className="h-4 w-2/3 rounded bg-gray-200"></div>

    </div>
  );
};

export default ShimmerCard;