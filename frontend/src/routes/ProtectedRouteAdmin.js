import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouteAdmin() {
    const token = localStorage.getItem("token");
    let isAuthenticated;

    if(token == null){
        isAuthenticated = false; 
    } else {
        isAuthenticated = true;
    }
    
    

    return (
        isAuthenticated? <Outlet path="/home"/> : <Navigate to="/"/> 
    );
}

export default ProtectedRouteAdmin;