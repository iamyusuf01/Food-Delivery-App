const MenuShimmer = () => {
  return (
    <div className="rounded-2xl shadow-lg px-4 py-4">
      {/* Image */}
      <div className="relative h-28 rounded-2xl mb-3 overflow-hidden">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      {/* Name */}
      <div className="relative h-4 w-2/3 mb-2 overflow-hidden rounded">
        <div className="absolute inset-0 shimmer"></div>
      </div>

      {/* Price + Button */}
      <div className="flex justify-between items-center mt-3">
        <div className="relative h-4 w-12 overflow-hidden rounded">
          <div className="absolute inset-0 shimmer"></div>
        </div>

        <div className="relative h-8 w-8 rounded-full overflow-hidden">
          <div className="absolute inset-0 shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default MenuShimmer;
