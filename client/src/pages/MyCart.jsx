import React, { useContext, useState } from "react";
import { FaChevronLeft, FaSleigh } from "react-icons/fa";
import { RestaurantsList } from "../assets/assets";
import { useParams } from "react-router";
import { CartContext } from "../context/CartContext";

const MyCart = () => {
  const { id, itemId } = useParams();
  const [edit, setEdit] = useState(false);
  const { cartItems, setCartItems } = useContext(CartContext);

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
            {/* {edit ? (
              <p className="uppercase text-green-600 underline">Done</p>
            ) : (
              <p className="uppercase text-amber-600 underline">Edit Item</p>
            )} */}
          </div>
        </div>
        {/*  */}
        <div>
          {cartItems.map((product) => (
            <div key={product.id}>
              <div className="border ">
                <img src='' />
              </div>
              <div>
                <div>
                  <p>{product.name}</p>
                  <p>Restaurants Name</p>
                  <p>price</p>
                </div>
                <div>
                  <p>X</p>
                </div>
              </div>
              <div>
                <p>Size</p>
                <div>
                  <p>Minus</p>
                  <p>Count</p>
                  <p>Plus</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyCart;
