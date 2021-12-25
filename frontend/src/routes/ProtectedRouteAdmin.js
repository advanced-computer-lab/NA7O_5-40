import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Context";

function ProtectedRouteAdmin() {
    const { isLoggedIn } = useAuthContext();

    var userData = localStorage.getItem("userData");

    userData = JSON.parse(userData);
    return (
        isLoggedIn && userData.isAdmin? <Outlet path="/admin"/> : <Navigate to="/"/> 
    );
}

export default ProtectedRouteAdmin;