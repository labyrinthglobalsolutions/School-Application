import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    const token = sessionStorage.getItem("token");

    if (token && role === "Admin") {
      navigate("/adminpannel");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default AdminProtectedRoute;

