import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router
import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";
import Toast from "../../components/utlis/toast";
import Modal from "react-modal";
import adminLogin from "../../images/adminlogin.png";
import logo from "../../images/b_logo.png";
import "./index.css";
const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State variable for error message
  const navigate = useNavigate(); // Get access to the navigation history

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const forgotPassword = () => {
    navigate("/EmployeeForgotPassword");
  };

  // const oneHour = 50 * 60 * 1000;

  // // After 1 hour, remove the token from sessionStorage
  // setTimeout(() => {
  //   sessionStorage.removeItem("token");
  //   console.log("Token removed after 1 hour");
  //   navigate("/adminlogin");
  // }, oneHour);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const jsonData = {
      email: formData.email,
      password: formData.password,
    };
    fetch(`${process.env.REACT_APP_FETCH_URL}/adminlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response, "respose");
          response.json().then((data) => {
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("role", data.role);
            if (data.role === "Admin") {
              navigate("/adminpannel");
            } else {
              navigate("/TeacherPanel");
            }
          });
        } else if (response.status === 405) {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
          navigate("/packageExpired");
        } else if (response.status === 400) {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
        } else {
          setError("Login failed");
        }
      })
      .catch(() => {
        setError("Error occurred during login");
      });
  };
  const onClickRegister = () => {
    navigate("/signup");
  };
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Header />
      <div className="admin-login-div-container">
        <div className="admin-login-form-main-container">
          <div className="admin-login-image-container">
            <img
              src={adminLogin}
              alt="login-img"
              className="admin-login-image"
            />
          </div>

          <div className="admin-login-form-bg-container">
            <div className="form-logo-container">
              <img src={logo} alt="login-img" className="admin-login-logo" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="admin-login-form-container"
            >
              <h1 className="admin-login-first-heading">Login</h1>
              <div className="admin-login-form-group-container">
                <label className="admin-login-form-label-text">Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="admin-login-input-text"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="admin-login-form-group-container">
                <label className="admin-login-form-label-text">Password:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="admin-login-input-text"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <center>
                <button className="admin-login-form-button" type="submit">
                  SIGN IN
                </button>
                {error && <p className="error-message">{error}</p>}{" "}
              </center>
            </form>

            <p className="admin-login-account" onClick={forgotPassword}>
              Forgot Password
            </p>
            <p
              onClick={onClickRegister}
              className="admin-login-dont-have-account"
            >
              Don't have an account? Register Your Organization
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;
