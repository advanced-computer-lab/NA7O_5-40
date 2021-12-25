import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Context";

function ProtectedRouteUser() {
    const { isLoggedIn } = useAuthContext();

    var userData = localStorage.getItem("userData");

    userData = JSON.parse(userData);
    return (
        isLoggedIn && !userData.isAdmin? <Outlet path="/home"/> : <Navigate to="/"/> 
    );
}

export default ProtectedRouteUser;