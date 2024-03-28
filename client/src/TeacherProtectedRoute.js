import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const TeacherProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);
  return children;
};

export default TeacherProtectedRoute;
