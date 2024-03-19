import React, { useState, useEffect } from "react";
import "./verify.css";
import Toast from "../utlis/toast";

import { useNavigate } from "react-router-dom";
const Verify = () => {
  const [email, setEmail] = useState("");
  const [code, setVerifyCode] = useState("");
  const navigate = useNavigate();
  const verifyUser = async (e) => {
    e.preventDefault();
    const jsonData = {
      email: email,
      verificationCode: code,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/superadminverify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData), // pass an object with properties email and verificationCode
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      if (response.status === 200) {
        const data = await response.json();
        setEmail("");
        setVerifyCode("");
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="verify-main-container">
      <form className="verify-form-container" onSubmit={verifyUser}>
        <div>
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="code">Enter Verification code</label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => setVerifyCode(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">verify</button>
        </div>
      </form>
    </div>
  );
};

export default Verify;
