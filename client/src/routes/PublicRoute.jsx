import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? <Navigate to={'/'} replace/> : children;
};

export default PublicRoute;
