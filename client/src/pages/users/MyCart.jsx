import { useContext, useState, useMemo, useEffect } from "react";
import { FaChevronLeft, FaMinus, FaPlus } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { CartContext } from "../../context/CartContext";
import { NavLink, useNavigate } from "react-router-dom";

const MyCart = () => {
  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState(false);
  const [address, setAddress] = useState("2118 Thornridge Cir. Syracuse");
  const [quantity, setQuantity] = useState({});

  const navigate = useNavigate();
  const { cartItems, removeCartItem } = useContext(CartContext);

  useEffect(() => {
    setQuantity({});
  }, [cartItems]);

  const getInitialQty = (id) => {
    const item = cartItems.find((i) => i.productId === id);
    return item?.quantity || 1;
  };

  const increase = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: (prev[id] ?? getInitialQty(id)) + 1,
    }));
  };

  const decrease = (id) => {
    setQuantity((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] ?? getInitialQty(id)) - 1, 1),
    }));
  };

  const total = useMemo(() => {
    if (!Array.isArray(cartItems)) return 0;

    return cartItems.reduce((sum, item) => {
      const qty = quantity[item.productId] ?? item.quantity ?? 1;
      return sum + item.price * qty;
    }, 0);
  }, [cartItems, quantity]);

  return (
    <div className="min-h-screen bg-black text-white font-ui relative">
      <div className="p-6 pb-48">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <NavLink
              to="/"
              className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center"
            >
              <FaChevronLeft />
            </NavLink>
            <h2 className="text-lg">Cart</h2>
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

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            Your cart is empty
          </p>
        ) : (
          cartItems.map((product) => {
            if (!product?.productId) return null; 

            const count =
              quantity[product.productId] ?? product.quantity ?? 1;

            return (
              <div
                key={product.productId}
                className="flex gap-4 py-4 border-b border-gray-700"
              >
                <img
                  src={product?.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-400">
                        {product.restaurantName || ""}
                      </p>
                      <p className="mt-1">
                        ₹{product.price * count}
                      </p>
                    </div>

                    {edit && (
                      <button
                        onClick={() =>
                          removeCartItem(product.productId)
                        }
                        className="w-6 h-6 bg-red-500 rounded-full text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => decrease(product.productId)}
                      className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center"
                    >
                      <FaMinus size={12} />
                    </button>

                    <span>{count}</span>

                    <button
                      onClick={() => increase(product.productId)}
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

      {/* Bottom Section */}
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
            className="mt-3 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        ) : (
          <p className="bg-gray-200 py-3 rounded-md my-2 px-2 text-sm">
            {address}
          </p>
        )}

        {/* Total */}
        <div className="flex justify-between py-4">
          <p>
            Total:{" "}
            <span className="text-black font-semibold">
              ₹{total}
            </span>
          </p>

          <div className="flex items-center gap-1 text-orange-500 text-sm">
            Breakdown <FaChevronRight size={12} />
          </div>
        </div>

        {/* Checkout */}
        <button
          onClick={() =>
            navigate("/payment", {
              state: { total, cartItems },
            })
          }
          disabled={cartItems.length === 0}
          className="uppercase bg-orange-500 disabled:bg-gray-300 disabled:text-gray-500 text-white w-full h-12 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default MyCart;