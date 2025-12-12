import {  Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import ForgetPassword from "./auth/ForgetPassword"
import Verification from "./auth/Verification"
import Profile from "./pages/Profile"
import PersonalInfo from "./profile/PersonalInfo"
import EditProfile from "./profile/EditProfile"
import AllRestaurants from "./components/AllRestaurants"
import RestaurantView from "./pages/RestaurantView"
import FoodDetails from "./components/FoodDetails"
import Food from "./pages/Food"
import MyCart from "./pages/MyCart"

function App() {

  return (
    <div>
      <Routes>
      {/* Authentication Routes */}
        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/personal-info" element={<PersonalInfo/>}/>
        <Route path="/personal-info/edit-profile" element={<EditProfile/>}/>
        <Route path="/all-restaurants" element={<AllRestaurants/>}/>
        <Route path="/all-restaurants/:id" element={<RestaurantView/>}/>
        <Route path="/restaurants/:id" element={<RestaurantView/>}/>
        <Route path="/food" element={<Food/>}/>
        {/* <Route path="/food-details/:itemId" element={<FoodDetails />} /> */}
        <Route path="/food-details/:id/:itemId" element={<FoodDetails />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/my-cart" element={<MyCart/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forget-password" element={<ForgetPassword/>}/>
        <Route path="/verification" element={<Verification/>}/>
      
      </Routes>
    </div>
  )
}

export default App
