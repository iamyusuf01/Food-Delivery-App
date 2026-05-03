import { useState, useContext, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { PiHandCoins } from "react-icons/pi";
import { RiVisaLine } from "react-icons/ri";
import { SiMastercard } from "react-icons/si";
import { useLocation, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Payment = () => {
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  const location = useLocation();
  const order = location.state?.order;
  const orderId = order?._id;
  
  useEffect(() => {
    if (!orderId) {
      // toast.error("Session expired. Please try again.");
      navigate("/my-cart");
    }
  }, [orderId]);

  const loadRazorPay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCOD = async () => {
    if (!orderId) return;

    try {
      setLoading(true);

      const { data } = await axios.post(
        backendUrl + "/api/order/change-method",
        {
          orderId,
          paymentMethod: "COD",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Order placed successfully");
        clearCart()
        navigate("/order/success"); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpay = async () => {
  if (!orderId) return;

  try {
    setLoading(true);

    const loaded = await loadRazorPay();
    if (!loaded) {
      toast.error("Razorpay failed to load");
      return;
    }

    const { data } = await axios.post(
      backendUrl + "/api/payment/initiate",
      { orderId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("INITIATE RESPONSE:", data);

    if (!data.success || !data.key || !data.order?.id) {
      toast.error("Payment initialization failed");
      return;
    }

    const options = {
      key: data.key,
      amount: data.order.amount,
      currency: data.order.currency,
      order_id: data.order.id,

      name: "Zestly Delivery App",
      description: "Order Payment",

      handler: async function (response) {
        console.log("RAZORPAY RESPONSE:", response);

        const payload = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId: orderId,
        };

        console.log("VERIFY PAYLOAD:", payload);

        try {
          const { data: verifyData } = await axios.post(
            backendUrl + "/api/payment/verify",
            payload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          console.log("VERIFY RESPONSE:", verifyData);

          if (verifyData.success) {
            toast.success("Payment Successful");

            setTimeout(() => {
              navigate("/payment/success");
            }, 500);
            clearCart()
          } else {
            toast.error(verifyData.message || "Verification failed");
          }
        } catch (err) {
          console.error("VERIFY ERROR:", err.response?.data || err.message);
          toast.error("Verification failed");
        }
      },

      modal: {
        ondismiss: function () {
          console.log("Payment popup closed");
        },
      },
    };

    const payment = new window.Razorpay(options);
    payment.open();
  } catch (error) {
    console.error("INITIATE ERROR:", error.response?.data || error.message);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6 font-ui">
      {/* Header */}
      <div className="flex gap-4 items-center">
        <div
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
        >
          <FaChevronLeft />
        </div>
        <h2 className="text-xl">Payment</h2>
      </div>

      {/* Payment Options */}
      <div className="mt-8 space-y-4">
        <div
          onClick={() => setMethod("cash")}
          className={`p-4 border rounded cursor-pointer flex items-center gap-3 ${
            method === "cash" ? "border-orange-500 bg-orange-50" : ""
          }`}
        >
          <PiHandCoins size={22} />
          <span>Cash on Delivery</span>
        </div>

        <div
          onClick={() => setMethod("online")}
          className={`p-4 border rounded cursor-pointer flex items-center gap-3 ${
            method === "online" ? "border-orange-500 bg-orange-50" : ""
          }`}
        >
          <RiVisaLine size={22} />
          <SiMastercard size={22} />
          <span>Pay Online</span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={method === "cash" ? handleCOD : handleRazorpay}
        disabled={!method || loading}
        className={`uppercase w-full mt-6 h-12 rounded font-medium ${
          method && !loading
            ? "bg-orange-500 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        {loading
          ? "Processing..."
          : method === "online"
          ? "Pay Online"
          : "Place Order"}
      </button>
    </div>
  );
};

export default Payment;