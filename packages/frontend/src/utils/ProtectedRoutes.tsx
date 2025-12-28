import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
