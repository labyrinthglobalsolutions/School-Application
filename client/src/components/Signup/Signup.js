import React, { useState } from "react";
import "./Signup.css";
import Toast from "../utlis/toast";
import { useNavigate } from "react-router-dom";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onClickButton = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBackendError(null); // Clear any previous backend errors

    // Validate the form data
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = sessionStorage.getItem("token");
    // Construct the request object with the POST method and the request body as JSON
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Set the Content-Type to JSON
      },
      body: JSON.stringify(formData),
    };
    fetch(
      `${process.env.REACT_APP_FETCH_URL}/superadminregister`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 201) {
          response.json().then((data) => {
            Toast.fire({
              icon: "success",
              title: data.message,
            });
            navigate("/verify");
          });
        } else {
          response.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: data.message,
            });
          });
          throw new Error(`Failed with status: ${response.status}`);
        }
      })
      .then((data) => {})
      .catch(() => {
        setBackendError("");
      });
  };

  return (
    <>
      <Header />

      <div className="customer-signin-div-container">
        <div className="login-image-container">
          <img
            src="https://www.ascarii.com/hubfs/Optimised-Customer-Service-v4.png"
            className="Login-image"
            alt=""
          />
        </div>
        <div className="customer-signin-form-main-container">
          <center>
            <h2 className="customer-signin-form-heading-container">Signup</h2>
          </center>
          <form
            onSubmit={handleSubmit}
            className="customer-singin-form-container"
          >
            <div className="customer-signin-form-group-container">
              <label className="customer-singnin-form-lable-container">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="customer-signin-input-container"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div className="customer-signin-form-group-container">
              <label className="customer-singnin-form-lable-container">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="customer-signin-input-container"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="customer-signin-form-group-container">
              <label className="customer-singnin-form-lable-container">
                Password:
              </label>
              <input
                type="password"
                name="password"
                className="customer-signin-input-container"
                value={formData.password}
                onChange={handleInputChange}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            {backendError && <p className="error-message">{backendError}</p>}
            <center>
              <button
                className="customer-signin-form-button-container"
                type="submit"
              >
                Sign Up
              </button>
            </center>
          </form>
          <p onClick={onClickButton}>Already have an account login</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
