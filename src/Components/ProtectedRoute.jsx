import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate,useLocation } from 'react-router-dom';
const ProtectedRoute = ({element ,adminOnly = false}) => {
    const { isAuthenticated,user} = useSelector((state) => state.user);
    const location = useLocation();
    
    if (!isAuthenticated) {
        return <Navigate to = "/login" state={{
            from:location.pathname,
            message:"Please login to continue",
        }}
        replace 
        />

    }
    if (adminOnly && user?.user?.role !== "admin") {
        return <Navigate to = "/" replace />
        }

  return element;
  
}

export default ProtectedRoute
