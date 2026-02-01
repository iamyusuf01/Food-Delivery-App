import React from "react";

const TrackOrder = () => {
  const trackOrder = [
    {
      id: 1,
      image: "",
      name: "Uttora Coffee House",
      status: "Order at 06 Sept, 10:00 PM",
      quantity: 2,
      item: "Burger",
    },
  ];
  return (
    <div>
      <div className="font-ui">
        {trackOrder.map((track) => (
          <div
            key={track.id}
            className="flex gap-4 bg-white py-2"
          >
            <div className="w-32 h-20 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Image</span>
            </div>

            <div className="py-1">
              <p className="text-lg font-medium">{track.name}</p>
              <p className="text-gray-500 text-sm">{track.status}</p>
              <p className="text-sm">
                {track.quantity}x{" "}
                <span className="text-gray-500">{track.item}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackOrder;
