import { RechartsDevtools } from "@recharts/devtools";
import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Line, LineChart } from "recharts";
import OrderCards from "../../components/admin/OrderCards";

const SellerDashboard = () => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 100,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1198,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 8800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 2908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 6800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 2800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 6300,
      amt: 2100,
    },
  ];

  const runningOrders = [
    {
      orderId: 1,
      name: "Chicken Thai Biryani",
      type: "Breakfast",
      price: 60,
    },
  ];
  const orderRequests = [
    {
      orderId: 2,
      name: "Paneer Biryani",
      type: "Lunch",
      price: 80,
    },
  ];
  const [activePanel, setActivePanel] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        activePanel &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setActivePanel(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePanel]);

  return (
    <div className="p-6 relative">
      <div className="grid grid-cols-2 justify-items-center gap-4">
        <button
          onClick={() => setActivePanel("running")}
          className=" shadow-sm px-4 rounded-xl bg-gray-50 w-full h-20 py-2"
        >
          <p className="text-4xl font-bold">{runningOrders.length}</p>
          <h2 className="uppercase text-sm pt-1 font-medium">Running Orders</h2>
        </button>
        <button
          onClick={() => setActivePanel("request")}
          className="shadow-sm rounded-xl bg-gray-50 w-full h-20 py-2 px-4"
        >
          <p className="text-4xl font-bold">{orderRequests.length}</p>
          <h2 className="uppercase text-sm pt-1 font-medium">Order Request</h2>
        </button>
      </div>
      {/* Total Revenue Chart */}
      <div className="shadow-sm rounded-xl py-4 mt-6 px-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm font-semibold">Total Revenue</p>
              <p className="text-xl font-semibold">$2,2421</p>
            </div>
            <select className="border rounded text-gray-600 text-sm">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>
          <div>
            <p className="underline text-orange-500">See Details</p>
          </div>
        </div>
        <LineChart
          style={{
            width: "100%",
            maxWidth: "400px",
            maxHeight: "100px",
            aspectRatio: 1.618,
          }}
          // responsive
          data={data}
        >
          <Line type="monotone" dataKey="pv" stroke="#F97316" strokeWidth={2} />
          <RechartsDevtools />
        </LineChart>
      </div>
      {/* Reviews */}
      <div className="shadow-sm rounded-xl py-4 mt-6 px-2 bg-gray-50 ">
        <div className="flex justify-between items-center">
          <p className="">Reviews</p>
          <p className="underline text-orange-500">See All Reviews</p>
        </div>
        <div className="flex items-center gap-4 py-4">
          <div className="flex items-center gap-1">
            <FaStar size={16} className="text-orange-500" />
            <p className="text-orange-500 font-semibold">4.9</p>
          </div>
          <p>Total 20 Reviews</p>
        </div>
      </div>
      {/*  */}
      <div className=" shadow-sm rounded-xl py-4 mt-4 px-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <p className="text-sm">Popular Items This Weeks</p>
          <p className="underline text-orange-500">See All</p>
        </div>
        <div>
          <img className="" />
        </div>
      </div>
      {/* Running Orders */}
      {activePanel === "running" && (
        <div
          ref={panelRef}
          className="shadow-lg bg-white w-full px-6 rounded-3xl absolute py-4 -bottom-20 right-0 overflow-hidden"
        >
          <hr className="border-2 mt-1 w-12 mx-auto rounded text-gray-300" />
          <h2 className="mt-4 text-md font-medium">{runningOrders.length} Running Order</h2>
          <OrderCards orders={runningOrders} />
        </div>
      )}
      {/* Orders Request */}
      {activePanel === "request" && (
        <div
          ref={panelRef}
          className="shadow-lg bg-white w-full px-6 rounded-3xl absolute py-4 -bottom-20 right-0 overflow-hidden"
        >
          <hr className="border-2 mt-1 w-12 mx-auto rounded text-gray-300" />
          <h2 className="mt-4 text-md font-medium">{orderRequests.length} Order Request</h2>
          <OrderCards orders={orderRequests} />
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
