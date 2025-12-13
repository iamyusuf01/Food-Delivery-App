import React, { useContext, useState } from "react";
import { FaChevronLeft, FaMinus, FaPlus, FaSleigh } from "react-icons/fa";
import { useParams } from "react-router";
import { CartContext } from "../context/CartContext";
import { restaurants } from "../assets/assets";

const MyCart = () => {
  const { id, itemId } = useParams();
  const [edit, setEdit] = useState("");
  const {
    increaseCount,
    decreaseCount,
    count = 1,
    cartItems
  } = useContext(CartContext);

  const restaurant = restaurants?.find((res) => res?.id === id);
  // const menuItem = restaurant?.menu?.find((menu) => menu?.itemId === itemId);

  return (
    <div className=" bg-black text-white">
      <div className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <p className="w-10 h-10 rounded-full bg-gray-600 py-3 px-3">
              <FaChevronLeft />
            </p>
            <h2 className="text-xl">Cart</h2>
          </div>
          <div>
            {edit ? (
              <button
                className="uppercase text-green-600 underline"
                onClick={() => setEdit(false)}
              >
                Done
              </button>
            ) : (
              <button
                className="uppercase text-amber-600 underline"
                onClick={() => setEdit(true)}
              >
                Edit Item
              </button>
            )}
          </div>
        </div>
        {/*  */}
        <div>
          <div>
            {cartItems?.map((product) => (
              <div
                key={product.id}
                className="my-4 flex flex-1 items-center gap-4 py-4 h-44 "
              >
                <div className="w-1/2 h-32 rounded-xl bg-gray-700 flex-wrap ">
                  <img src={product.restaurantImage} />
                </div>
                <div>
                  <div className="flex justify-between gap-2">
                    <div className="">
                      <p className="py-1">{product.name}</p>
                      <p>{product.restaurantName}</p>
                      <p className="py-1">${product.price}</p>
                    </div>
                    {edit ? (
                      <div className=" w-6 h-6 bg-red-500 rounded-full mx-auto text-center">
                        <p className="text-sm">X</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex justify-between py-2">
                    {/* <p>14</p> */}
                    <div className="flex gap-4">
                      <p
                        className=" w-6 h-6 bg-gray-700 rounded-full items-center px-1.5 py-1.5"
                        onClick={decreaseCount}
                      >
                        <FaMinus size={12} />
                      </p>
                      <p>{count}</p>
                      <p
                        className=" w-6 h-6 bg-gray-700 rounded-full items-center px-1.5 py-1.5"
                        onClick={increaseCount}
                      >
                        <FaPlus size={12} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
