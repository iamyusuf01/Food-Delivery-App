import React from "react";
import Navbar from "../../components/admin/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, useLocation, useParams } from "react-router";
import Footer from "../../components/admin/Footer";

const Admin = () => {
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();
  const { itemId } = useParams();

  const hiddenRoutes = [
    "/admin/my-profile",
    "/admin/add-item",
    "/admin/my-food-list",
    `/admin/chef-food-details/${itemId}`,
    "/admin/add-restaurant",
  ];

  const hideLayout = hiddenRoutes.includes(location.pathname);
  return (
    isAdmin && (
      <div className="bg-gray-100">
        {!hideLayout && <Navbar />}
        <Outlet />
        {!hideLayout && <Footer />}
      </div>
    )
  );
};

export default Admin;
