import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthGuardingRegister({ children }) {
  const { user } = useSelector((state) => state.userStore);
  function checkUser() {
    if (Object.keys(user).length > 0) {
      return user;
    }
  }
  return checkUser() ? <Navigate to={"/"} /> : children;
}

export default AuthGuardingRegister;
