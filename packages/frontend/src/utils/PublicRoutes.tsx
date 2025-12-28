import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext"

const PublicRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoutes
