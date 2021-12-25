import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../Context";

function ProtectedRouteUser() {
    const { isLoggedIn } = useAuthContext();

    const token = localStorage.getItem("token");

    console.log(isLoggedIn);
    return (
        isLoggedIn? <Outlet path="/home"/> : <Navigate to="/"/> 
    );
}

export default ProtectedRouteUser;