import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AuthContext.jsx";
import { CardContextProvider } from "./context/CartContext.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <CardContextProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CardContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
