import { createContext, useState } from "react";
import { restaurants } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [authState, setAuthState] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);
  const [allRestaurants, setRegisteredRestaurants] = useState(
    [...restaurants].sort((a, b) => b.rating - a.rating)
  );
  const [allDish, setAllDish] = useState(
    restaurants.map((res) => res.menu).flat()
  );

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
    navigate,
    authState,
    setAuthState,
    isLoggedIn,
    setIsLoggedIn,
    allRestaurants,
    setRegisteredRestaurants,
    restaurants,
    setAllDish,
    allDish,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
