import React from "react";

const RunningOrders = () => {
  const Orders = [
    {
      name: "Chicken Thai Biryani",
      type: "Breakfast",
      orderId: 32053,
      price: 60,
    },
    {
      name: "Chicken Thai Biryani",
      type: "Breakfast",
      orderId: 32053,
      price: 60,
    },
  ];
  return (
    <div className="shadow-lg bg-white w-full px-6 rounded-3xl absolute py-4 -bottom-20 right-0 overflow-hidden">
      <hr className="border-2 mt-1 w-12 mx-auto rounded text-gray-300" />
      <h2 className="mt-4 text-md font-medium">20 Running Orders</h2>
      <div className="">
        {Orders.map((item, key) => (
          <div key={key} className="flex items-center gap-4 py-2 my-2">
            <img className="bg-gray-300 rounded-xl w-28 h-28 " src="" />
            <div className="w-2/3">
              <div className="flex flex-col">
                <p className="text-orange-500">#{item.type}</p>
                <p className="text-sm font-semibold py-1">{item.name}</p>
                <p className="text-gray-400 ">ID: {item.orderId}</p>
              </div>
              <div className="flex justify-between items-center py-1">
                <div>
                  <p className="font-semibold">${item.price}</p>
                </div>
                <div className="flex justify-between gap-4">
                  <button className=" text-white text-sm w-14 h-6 px-1 pb-1 rounded bg-orange-500">
                    Done
                  </button>
                  <button className=" text-red-600 text-sm w-14 h-6 px-1 pb-1 rounded border border-red-500">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RunningOrders;
