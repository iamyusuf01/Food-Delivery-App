const FoodDetailsShimmer = () => {
  return (
    <div className="overflow-hidden font-ui animate-pulse">
      <div className="p-6">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="h-6 w-24 bg-gray-200 rounded"></div>
        </div>

        {/* Image */}
        <div className="my-4">
          <div className="h-56 w-full rounded-xl bg-gray-200"></div>

          {/* Restaurant badge */}
          <div className="mt-4 h-8 w-40 bg-gray-200 rounded-full"></div>

          {/* Title */}
          <div className="mt-4 h-6 w-1/2 bg-gray-200 rounded"></div>

          {/* Description */}
          <div className="mt-2 h-4 w-full bg-gray-200 rounded"></div>
          <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>

        {/* Rating / Delivery / Time */}
        <div className="flex items-center gap-12 pt-2">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="h-5 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Sizes */}
        <div className="flex gap-6 items-center mt-6">
          <div className="h-5 w-16 bg-gray-200 rounded"></div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FoodDetailsShimmer;