import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import React Router
import "./Login.css";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import Toast from "../utlis/toast";
import Signup from "../Signup/Signup";

import login from "../Images/login.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [staff, setStaff] = useState(true);

  const [error, setError] = useState(""); // State variable for error message
  const navigate = useNavigate(); // Get access to the navigation history

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    // Define the URL of your server's login endpoint
    const url = `${process.env.REACT_APP_FETCH_URL}/superadminlogin`;

    // Create a JSON object with the form data
    const jsonData = {
      email: formData.email,
      password: formData.password,
    };

    // Make a POST request using the fetch API with JSON data
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the Content-Type to JSON
      },
      body: JSON.stringify(jsonData), // Convert JSON object to string
    })
      .then((response) => {
        if (response.status === 200) {
          // Login successful
          response.json().then((data) => {
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            navigate("/");

            // sessionStorage.setItem("token", data.token);
            // localStorage.setItem("role", data.role);
            // sessionStorage.setItem("role", data.role);
            // sessionStorage.setItem("sname", data.name);
            // setTimeout(() => {
            //   navigate("/customernavbar");

            //   if (data.role === "Admin") {
            //     navigate("/admin");
            //   } else if (data.role === "Label") {
            //     navigate("/labelOrders");
            //   } else if (data.role === "Dimension") {
            //     navigate("/dimensionorders");
            //   } else if (data.role === "Accountant") {
            //     navigate("/accountOrders");
            //   }
            // }, 100);
          });
        } else if (response.status === 400) {
          // Password required or incorrect
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
        } else {
          // Handle other status codes or error messages
          setError("Login failed");
        }
      })
      .catch((error) => {
        setError("Error occurred during login");
      });
  };

  const onClickStaff = () => {
    navigate("/signup");
  };

  const activeStaffButton = staff
    ? `signin-staff-button`
    : `signin-customer-button`;
  const activeCustomerButton = staff
    ? `signin-customer-button`
    : `signin-staff-button`;

  return (
    <>
      <Header />
      <div className="signin-div-container">
        <div className="login-image-container">
          <img src={login} className="Login-image" alt="" />
        </div>
        <div className="signin-form-main-container">
          {/* <div className="signin-staff-customer-button-container">
          <button className={activeStaffButton} onClick={onClickStaff}>Staff Signin</button>
          <button className={activeCustomerButton} onClick={onClickCustomer}>
            Customer Signin
          </button>
        </div> */}
          {staff ? (
            <>
              <center>
                <h2 className="signin-form-heading-container">Login</h2>
              </center>

              <form onSubmit={handleSubmit} className="signin-form-container">
                <div className="signin-form-group-container">
                  <label className="signin-form-label-container">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="signin-input-text"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="signin-form-group-container">
                  <label className="signin-form-label-container">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="signin-input-text"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <center>
                  <button
                    className="signin-form-button-container"
                    type="submit"
                  >
                    Sign In
                  </button>
                  {error && <p className="error-message">{error}</p>}{" "}
                  {/* Display error message */}
                </center>
              </form>
              <p onClick={onClickStaff}>Don't have an account?</p>
            </>
          ) : (
            <Signup />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
