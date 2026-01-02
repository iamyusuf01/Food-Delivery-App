import { createContext, use, useState } from "react";
import { restaurants } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AuthContext = createContext();

const menuOptions = [
  { value: "burger", label: "BURGER" },
  { value: "pizza", label: "PIZZA" },
  { value: "hotdog", label: "HOTDOG" },
  { value: "chicken", label: "CHICKEN" },
  { value: "biryani", label: "BIRYANI" },
];

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_API_URL;

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // const [authState, setAuthState] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [allRestaurants, setRegisteredRestaurants] = useState(
    [...restaurants].sort((a, b) => b.rating - a.rating)
  );
  const [allDish, setAllDish] = useState(
    restaurants.map((res) => res.menu).flat()
  );

  console.log(backendUrl);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/auth/is-auth",
        { withCredentials: true }
      );
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const { data } = await axios.get("http://localhost:4000/api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (data.success) {
        setUserData(data.userData);
        setIsLoggedIn(true);
        console.log(data);
      } else {
        toast.error(data.message);
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getAuthState;
    getUserData;
  });

  useEffect(() => {
    if (!token) {
      getUserData();
    }
  }, [token]);

  const value = {
    token,
    setToken,
    navigate,
    isLoggedIn,
    setIsLoggedIn,
    allRestaurants,
    setRegisteredRestaurants,
    restaurants,
    setAllDish,
    allDish,
    menuOptions,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
