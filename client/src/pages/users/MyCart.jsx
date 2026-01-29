import React, { useContext, useState } from "react";
import { FaChevronLeft, FaMinus, FaPlus } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { CartContext } from "../../context/CartContext";
import { NavLink, useNavigate } from "react-router";

const MyCart = () => {
  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState(false);
  const [address, setAddress] = useState("2118 Thornridge Cir. Syracuse");

  // local quantity per item
  const [quantity, setQuantity] = useState({});
  const naviagte = useNavigate()

  const { cartItems, removeCartItem } = useContext(CartContext);

  const increase = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  const total = cartItems.reduce((sum, item) => {
    const qty = quantity[item.itemId] || 1;
    return sum + item.price * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white font-ui relative">
      <div className="p-6 pb-48">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <NavLink
              to="/"
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"
            >
              <FaChevronLeft />
            </NavLink>
            <h2 className="text-xl">Cart</h2>
          </div>

          <button
            onClick={() => setEdit(!edit)}
            className={`uppercase underline ${
              edit ? "text-green-500" : "text-amber-500"
            }`}
          >
            {edit ? "Done" : "Edit Item"}
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            Your cart is empty
          </p>
        ) : (
          cartItems.map((product) => {
            const count = quantity[product.itemId] || 1;

            return (
              <div
                key={product.itemId}
                className="flex gap-4 py-4 border-b border-gray-700"
              >
                <div className="w-32 h-32 bg-gray-700 rounded-xl" />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-400">
                        {product.restaurantName}
                      </p>
                      <p className="mt-1">₹{product.price}</p>
                    </div>

                    {edit && (
                      <button
                        onClick={() => removeCartItem(product.itemId)}
                        className="w-6 h-6 bg-red-500 rounded-full text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => decrease(product.itemId)}
                      className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center"
                    >
                      <FaMinus size={12} />
                    </button>

                    <span>{count}</span>

                    <button
                      onClick={() => increase(product.itemId)}
                      className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="bg-white rounded-t-2xl py-4 px-6 text-gray-600">
        <div className="flex justify-between items-center">
          <h2 className="uppercase text-lg">Delivery Address</h2>
          <button
            onClick={() => setChange(!change)}
            className={`uppercase underline ${
              change ? "text-green-500" : "text-amber-500"
            }`}
          >
            {change ? "Done" : "Edit"}
          </button>
        </div>

        {change ? (
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-3 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          />
        ) : (
          <p className="bg-gray-200 py-3 rounded-md my-2 px-2 text-sm">
            {address}
          </p>
        )}
        <div className="flex justify-between py-4">
          <p>
            Total: <span className="text-black font-semibold">₹{total}</span>
          </p>
          <div className="flex items-center gap-1 text-orange-500 text-sm">
            Breakdown <FaChevronRight size={12} />
          </div>
        </div>
        <button 
          onClick={() => naviagte('/payment')}
          disabled={cartItems.length === 0}
          className="uppercase bg-orange-500 disabled:bg-gray-300 disabled:text-gray-500 text-white w-full h-12 rounded active:scale-95 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default MyCart;
