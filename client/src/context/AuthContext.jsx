import { createContext, useState } from "react";
// import { restaurants } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
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
  console.log(backendUrl);

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // const [authState, setAuthState] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [OpenRestaurants, setOpenRestaurants] = useState(false);

  const [restaurants, setRestaurants] = useState([]);

  const [allRestaurants, setRegisteredRestaurants] = useState(
    [...restaurants].sort((a, b) => b.rating - a.rating),
  );
  const [allDish, setAllDish] = useState(
    restaurants.map((res) => res.menu).flat(),
  );
  const token = localStorage.getItem("accessToken");
  // const { id } = useParams();

  const getAuthState = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/is-auth",
        null,
        { withCredentials: true, validateStatus: () => true },
      );
      if (data?.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/data",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        { withCredentials: true },
      );
      if (data?.success) {
        setIsLoggedIn(true);
        setUserData(data?.userData);
        setIsAdmin(data.userData.role === "admin");
        // console.log(data.userData.role);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // const getRestaurantData = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "http://localhost:4000/api/restaurant/current-restaurant"
  //     );
  //     if (data.success) {
  //       setRestaurantData(data.restaurantData);
  //       console.log(data);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

  const fetchAllRestaurants = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/restaurant/all",
      );
      if (data.success) {
        setRestaurants(data.restaurants);
        setOpenRestaurants(data.restaurants.some((r) => r.isOpen) || false);
      }
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  useEffect(() => {
    getAuthState();
    getUserData()
  }, []);

  useEffect(() => {
    if (token){
      getUserData();
    };
  }, [token]);

  const value = {
    token,
    navigate,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
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
    restaurantData,
    OpenRestaurants,
    // menu,
    // fetchMenuByRestaurantId
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
