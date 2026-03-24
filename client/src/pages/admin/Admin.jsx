import React from "react";
import Navbar from "../../components/admin/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, useLocation } from "react-router";

const Admin = () => {
  const { isAdmin } = useContext(AuthContext);
  const location = useLocation();

  const hiddenRoutes = [

  ];

  const hideLayout = hiddenRoutes.includes(location.pathname);
  return (
    isAdmin && (
      <div className="bg-gray-100">
        {!hideLayout && <Navbar />}
        <Outlet />
      </div>
    )
  );
};

export default Admin;
