import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {

    let isAuthenticated = false;


    if(localStorage.getItem('admin')){
        isAuthenticated = true
    }

  
    return isAuthenticated ? (
      <>{children}</>
    ) : (
      <Navigate to="/login" />
    );
  };