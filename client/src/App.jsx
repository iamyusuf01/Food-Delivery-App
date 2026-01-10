import { Route, Routes} from "react-router";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgetPassword from "./auth/ForgetPassword";
import Verification from "./auth/Verification";
import Profile from "./pages/Profile";
import PersonalInfo from "./profile/PersonalInfo";
import EditProfile from "./profile/EditProfile";
import AllRestaurants from "./components/AllRestaurants";
import RestaurantView from "./pages/RestaurantView";
import FoodDetails from "./components/FoodDetails";
import Food from "./pages/Food";
import MyCart from "./pages/MyCart";
import Payment from "./pages/Payment";
import AddCard from "./payment/AddCard";
import CheckPayment from "./payment/CheckPayment";
import { ToastContainer } from "react-toastify";
import Search from "./pages/Search";
import SpecificItem from "./pages/SpecificItem";
import PublicRoute from "./routes/PublicRoute";
import SellerDashboard from "./pages/admin/SellerDashboard";
import Admin from "./pages/admin/Admin";
import MyProfile from "./pages/admin/MyProfile";
import AddItem from "./pages/admin/AddItem";
import ChefFoodDetails from "./pages/admin/ChefFoodDetails";
import MyFood from "./pages/admin/MyFood";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Authentication Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/my-cart" element={<MyCart />} />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verification" element={<Verification />} />

        {/* User Profile Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/personal-info" element={<PersonalInfo />} />
        <Route path="/personal-info/edit-profile" element={<EditProfile />} />

        {/* Restaurant Routes */}
        <Route path="/all-restaurants" element={<AllRestaurants />} />
        <Route path="/all-restaurants/:id" element={<RestaurantView />} />
        <Route path="/restaurants/:id" element={<RestaurantView />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food-details/:menuItem" element={<FoodDetails />} />

        {/* Payment Routes */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/add-card" element={<AddCard />} />
        <Route path="/payment/verify-payment" element={<CheckPayment />} />

        {/* Search Routes */}
        <Route path="/search" element={<Search />} />
        <Route path="/search/:item" element={<SpecificItem />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<SellerDashboard />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="my-food-list" element={<MyFood />} />
          <Route path="food-details" element={<ChefFoodDetails />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
