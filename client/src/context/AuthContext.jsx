import { createContext, useState } from "react";
import { restaurants } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [authState, setAuthState] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  console.log(backendUrl);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    authState,
    setAuthState,
    isLoggedIn,
    setIsLoggedIn,
    restaurants,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
