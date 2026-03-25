import React from "react";
import Navbar from "../../components/admin/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, useLocation, useParams } from "react-router";
import Footer from "../../components/seller/Footer";

const SellerLayout = () => {
  const { isSeller } = useContext(AuthContext);
  const location = useLocation();
  const { itemId } = useParams();

  const hiddenRoutes = [
    "/seller/my-profile",
    "/seller/add-item",
    "/seller/my-food-list",
    `/seller/chef-food-details/${itemId}`,
    "/seller/add-restaurant",
    "/seller/chat",
  ];

  const hideLayout = hiddenRoutes.includes(location.pathname);
  return (
    isSeller && (
      <div className="bg-gray-100">
        {!hideLayout && <Navbar />}
        <Outlet />
        {!hideLayout && <Footer />}
      </div>
    )
  );
};

export default SellerLayout;
