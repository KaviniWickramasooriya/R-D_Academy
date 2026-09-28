import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const token = localStorage.getItem("adminToken");

  // If no token exists, redirect straight to the admin login page
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // If authenticated, render the child admin layout/routes
  return <Outlet />;
}