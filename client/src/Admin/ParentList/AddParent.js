import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function AddParent() {
  const [parentData, setParentData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setParentData({ ...parentData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/addparent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parentData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add parent");
      }

      setParentData({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
        password: "",
      });

      setLoading(false);
      console.log("Parent added successfully");
      // Optionally, redirect or show a success message
    } catch (error) {
      console.error("Error adding parent:", error.message);
      setError("Failed to add parent. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="teacher-add-totalContainer">
      <h2>Add Parent</h2>
      <Form onSubmit={handleSubmit} className="teacher-add-formContainer">
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={parentData.fullName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={parentData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={parentData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={parentData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={parentData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="global-add-button" disabled={loading}>
          {loading ? "Adding..." : "Submit"}
        </button>
      </Form>
    </div>
  );
}

export default AddParent;
