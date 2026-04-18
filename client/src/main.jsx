import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AuthContext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";
import { PaymentContextProvider } from "./context/PaymentContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <CartContextProvider>
        <PaymentContextProvider>
          <App />
        </PaymentContextProvider>
      </CartContextProvider>
    </AppContextProvider>
  </BrowserRouter>,
);
