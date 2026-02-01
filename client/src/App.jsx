import { Route, Routes} from "react-router";
import { ToastContainer } from "react-toastify";

/* Public Pages */
import Home from "./pages/users/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Verification from "./pages/auth/Verification";
import Search from "./pages/users/Search";
import SpecificItem from "./pages/users/SpecificItem";

/* User Pages */
import Profile from "./pages/users/Profile";
import PersonalInfo from "./profile/PersonalInfo";
import EditProfile from "./profile/EditProfile";
import AllRestaurants from "./components/users/AllRestaurants";
import RestaurantView from "./pages/users/RestaurantView";
import FoodDetails from "./components/users/FoodDetails";
import Food from "./pages/users/Food";
import MyCart from "./pages/users/MyCart";
import Payment from "./pages/users/Payment";
import MyOrders from "./pages/users/MyOrders";
import MyAddress from "./pages/users/MyAddress";
import AddNewAddress from "./components/users/AddNewAddress";

/* Payments */
import AddCard from "./payment/AddCard";
import CheckPayment from "./payment/CheckPayment";

/* Admin & Seller */
import Admin from "./pages/admin/Admin";
import SellerDashboard from "./pages/admin/SellerDashboard";
import PublicRoute from "./routes/PublicRoute";
import MyProfile from "./pages/admin/MyProfile";
import AddItem from "./pages/admin/AddItem";
import ChefFoodDetails from "./pages/admin/ChefFoodDetails";
import MyFood from "./pages/admin/MyFood";
import AddRestaurant from "./pages/admin/AddRestaurant";
import ViewNotification from "./pages/admin/ViewNotification";
import Order from "./pages/TrackOrders/Order";


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
        <Route path="/profile/my-address" element={<MyAddress />} />
        <Route path="/profile/add-address" element={<AddNewAddress />} />
        <Route path="/personal-info/edit-profile" element={<EditProfile />} />
        <Route path="/my-orders" element={<MyOrders />} />


        {/* Restaurant Routes */}
        <Route path="/all-restaurants" element={<AllRestaurants />} />
        <Route path="/all-restaurants/:id" element={<RestaurantView />} />
        <Route path="/restaurants/:id" element={<RestaurantView />} />
        <Route path="/food" element={<Food />} />
        <Route path="/food-details/:itemId" element={<FoodDetails />} />

        {/* Payment Routes */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/add-card" element={<AddCard />} />
        <Route path="/payment/verify-payment" element={<CheckPayment />} />

        {/* Tracking Orders */}
        <Route path="/track-order" element={<Order />} />

        {/* Search Routes */}
        <Route path="/search" element={<Search />} />
        <Route path="/search/:item" element={<SpecificItem />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route index element={<SellerDashboard />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="add-restaurant" element={<AddRestaurant />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="my-food-list" element={<MyFood />} />
          <Route path="chef-food-details/:itemId" element={<ChefFoodDetails />} />
          <Route path="chat" element={<ViewNotification />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
