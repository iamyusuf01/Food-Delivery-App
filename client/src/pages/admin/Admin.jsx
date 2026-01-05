import React from "react";
import Navbar from "../../components/admin/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet } from "react-router";
import Wrapper from "../../components/admin/Wrapper";

const Admin = () => {
  const { isAdmin } = useContext(AuthContext);
  return (
    isAdmin && (
      <div className="bg-gray-200">
        <Wrapper />
        <Outlet />
      </div>
    )
  );
};

export default Admin;
