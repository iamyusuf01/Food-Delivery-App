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
  console.log("backend", backendUrl);

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // const [authState, setAuthState] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [restaurantData, setRestaurantData] = useState(null);
  const [OpenRestaurants, setOpenRestaurants] = useState(false);

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(true);

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
        backendUrl + "/api/auth/is-auth",
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
        backendUrl + "/api/user/data",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        { withCredentials: true },
      );
      if (data?.success) {
        setIsLoggedIn(true);
        setUserData(data?.userData);
        setIsAdmin(data.userData.role === "admin");
        setIsSeller(data.userData.role === "seller");
        // console.log(data.userData.role);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllRestaurants = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/restaurant/all");
      if (data.success) {
        setRestaurants(data.restaurants);
        setRegisteredRestaurants(data.restaurants)
        setOpenRestaurants(data.restaurants.some((r) => r.isOpen) || false);
      }
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMenu = async () => {
    try {
      setMenuLoading(true);
      const { data } = await axios.get(backendUrl + `/api/menu/all-menu`);
      if (data.success) {
        setMenu(data.menu);
        setAllDish(data.menu)
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setMenuLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMenu();
  }, []);

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  useEffect(() => {
    getAuthState();
    // getUserData()
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  const value = {
    token,
    navigate,
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    isAdmin,
    isSeller,
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
    loading,
    menuLoading,
    menu
    // menu,
    // fetchMenuByRestaurantId
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
