import React from "react";

const Ongoing = () => {
  const OrderItem = [
    {
      type: "Food",
      name: "Pizza Hut",
      orderId: 162432,
      price: 35,
      image: "",
      quantity: 2,
    },
  ];
  return (
    <div className="font-ui space-y-6">
      {OrderItem.map((item, index) => (
        <div key={index} className="rounded-xl p-4 shadow-sm bg-white">
          <div className="mb-3">
            <h2 className="text-lg">{item.type}</h2>
            <hr className="mt-2 border-gray-300" />
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="w-24 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
              <img
                // src={item.image}
                // alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex justify-between w-full">
              <div>
                <h2 className="font-medium text-base">{item.name}</h2>
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 text-sm">₹{item.price}</p>
                  <hr className="border border-gray-300 h-4"/>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                <p>#{item.orderId}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <button className="px-4 py-1.5 rounded-full bg-orange-500 text-white text-sm hover:bg-orange-600">
              Track
            </button>
            <button className="px-4 py-1.5 rounded-full border border-red-500 text-red-500 text-sm hover:bg-red-50">
              Cancel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ongoing;
