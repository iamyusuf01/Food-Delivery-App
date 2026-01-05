import React from "react";
import { useLocation } from "react-router";
import Navbar from "./Navbar";

const Wrapper = () => {
  const location = useLocation();

  if (location.pathname === "/admin/my-profile") {
    return null;
  }
  return <Navbar />;
};

export default Wrapper;
