import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);
  // user.role → "admin" | "seller" | "user"

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Still loading user data
  if (!userData) {
    return null;
  }
  
  // Role not allowed
  if (!allowedRoles.includes(userData?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
