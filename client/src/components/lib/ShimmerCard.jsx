const ShimmerCard = () => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 overflow-hidden my-4">
      
      {/* Image */}
      <div className="relative h-44 rounded-xl mb-4 overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>
      <div className="relative h-5 w-1/2 rounded mb-3 overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      {/* Description */}
      <div className="relative h-3 w-3/4 rounded mb-2 overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      <div className="relative h-3 w-2/3 rounded mb-4 overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="relative h-4 w-12 rounded overflow-hidden"
          >
            <div className="absolute inset-0 shimmer"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerCard;
