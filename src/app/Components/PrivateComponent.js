import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateComponent = () => {

  const token = localStorage.getItem("token");
  if (token) {
    var decoded = jwt_decode(JSON.parse(token));
    var date = new Date();
    var date2 = new Date(decoded.exp * 1000)
    if (date > date2) {
      console.log("Token Expires", date , date2);
      alert("Token Expire... Refresh and Signin Again")
      setTimeout(() => {
        localStorage.clear();
        return <Navigate to="/signin" />
      }, 1000);
    } else {
      console.log("Token Is Valid", date , date2);
      const auth = localStorage.getItem("user");
      return auth ? <Outlet /> : <Navigate to="/signin" />;
    }
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateComponent;
