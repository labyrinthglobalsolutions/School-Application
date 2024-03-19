import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Tast from "../../components/utlis/toast";
// import "../../Employee/EmployeeUpdatePassword/EmployeeUpdatePassword.css";
import Toast from "../../components/utlis/toast";

const DeleteEmploeeModalPage = ({ onClose, deleteEmployeeId, deleteId }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async () => {
    const authToken = sessionStorage.getItem("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/verifyAdminIdentity`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (response.ok) {
        await onClose();
        await deleteEmployeeId(deleteId);
      } else {
        const data = await response.json();
        onClose();
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      alert("An error occurred while updating the password.");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10px",
        }}
      >
        <ImCancelCircle
          onClick={onClose}
          style={{
            fontSize: "24px",
            color: "#212d45",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        />
      </div>
      <div className="update-password-form-main-container">
        <h2 className="update-password-heading">Verify your Identity</h2>
        <form className="update-password-form-continer">
          <div className="update-password-input-container">
            <label htmlFor="oldPassword" className="update-password-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter your Email"
              className="update-password-input"
            />
          </div>
          <div className="update-password-input-container">
            <label htmlFor="newPassword" className="update-password-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Enter your password"
              className="update-password-input"
            />
          </div>

          <div
            style={{ marginTop: "30px" }}
            className="update-password-button-container"
          >
            <button
              type="button"
              className="update-password-button"
              onClick={handleSubmit}
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeleteEmploeeModalPage;
