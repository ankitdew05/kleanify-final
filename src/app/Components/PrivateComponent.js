import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateComponent = () => {

  // const token = localStorage.getItem("token");
  // if (token) {
  //   var decoded = jwt_decode(JSON.parse(token));
  //   var date = new Date();
  //   var date2 = new Date(decoded.exp * 1000)
  //   if (date > date2) {
  //     console.log("Token Expires", date , date2);
  //     alert("Token Expire... Refresh and Signin Again")
  //     setTimeout(() => {
  //       localStorage.clear();
  //       return <Navigate to="/signin" />
  //     }, 1000);
  //   } else {
  //     console.log("Token Is Valid", date , date2);
  //     const auth = localStorage.getItem("user");
  //     return auth ? <Outlet /> : <Navigate to="/signin" />;
  //   }
  // } else {
  //   return <Navigate to="/signin" />;
  // }
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/signin" />;
  }

  const decoded = jwt_decode(token);
  const currentDate = new Date();
  const expiryDate = new Date(decoded.exp * 1000);

  if (currentDate > expiryDate) {
    //console.log("Token Expires", currentDate, expiryDate);
    alert("Token Expire... Refresh and Signin Again");
    localStorage.clear();
    window.location.href = "/signin";
  } else {
    //console.log("Token Is Valid", currentDate, expiryDate);
    const auth = localStorage.getItem("user");
    return auth ? <Outlet /> : <Navigate to="/signin" />;
  }

};

export default PrivateComponent;
