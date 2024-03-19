import React, { useState } from "react";
import "./index.css";

const UserRoleForm = () => {
  const [formData, setFormData] = useState({
    RoleName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token"); // Replace with your actual token key
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/addrole`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-role-main-container">
      <form onSubmit={handleSubmit} className="add-role-form-container">
        <label className="add-role-label">
          Role Name:
          <input
            type="text"
            name="RoleName"
            value={formData.RoleName}
            onChange={handleChange}
            className="add-role-input"
            placeholder="Ex: manager, HR"
          />
        </label>
        <button type="submit" className="add-role-button">
          Create User Role
        </button>
      </form>
    </div>
  );
};

export default UserRoleForm;
