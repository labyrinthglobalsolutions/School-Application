import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./index.css";
import Toast from "../../components/utlis/toast";

function EditFeeDetails({ FeeDetailId }) {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    classId: "",
    tuitionFee: "",
    examFee: "",
    transportationFee: "",
    booksFee: "",
    uniformFee: "",
    otherFees: "",
  });

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/getFeeDetailsById/${FeeDetailId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch fee details");
        }
        const feeDetails = await response.json();
        setData({ ...feeDetails, classId: feeDetails.class }); // Populate form fields with fetched data
      } catch (error) {
        console.error("Error fetching fee details:", error.message);
        Toast.fire({
          icon: "error",
          title: "Failed to fetch fee details",
        });
      }
    };

    fetchFeeDetails();
  }, [FeeDetailId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      Toast.fire({
        icon: "error",
        title: "Please fill all required fields",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/updateFeeDetailsById/${FeeDetailId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update fee details");
      }

      setValidated(false);

      Toast.fire({
        icon: "success",
        title: "Fee details updated successfully",
      });
    } catch (error) {
      console.error("Error updating fee details:", error.message);
      Toast.fire({
        icon: "error",
        title: "Failed to update fee details",
      });
    }
  };

  return (
    <div className="add-fee-details-container">
      <h2>Update Fee Details</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="classId">
          <Form.Label>Class</Form.Label>
          <Form.Control
            as="select"
            name="classId"
            value={data.classId}
            onChange={handleChange}
            required
          >
            <option value="">Select Class</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={`Grade ${index + 1}`}>
                Grade {index + 1}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a class.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="tuitionFee">
          <Form.Label>Tuition Fee</Form.Label>
          <Form.Control
            type="number"
            name="tuitionFee"
            value={data.tuitionFee}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide tuition fee.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="examFee">
          <Form.Label>Exam Fee</Form.Label>
          <Form.Control
            type="number"
            name="examFee"
            value={data.examFee}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide exam fee.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="transportationFee">
          <Form.Label>Transportation Fee</Form.Label>
          <Form.Control
            type="number"
            name="transportationFee"
            value={data.transportationFee}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide transportation fee.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="booksFee">
          <Form.Label>Books Fee</Form.Label>
          <Form.Control
            type="number"
            name="booksFee"
            value={data.booksFee}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide books fee.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="uniformFee">
          <Form.Label>Uniform Fee</Form.Label>
          <Form.Control
            type="number"
            name="uniformFee"
            value={data.uniformFee}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide uniform fee.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="otherFees">
          <Form.Label>Other Fees</Form.Label>
          <Form.Control
            type="number"
            name="otherFees"
            value={data.otherFees}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide other fees.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default EditFeeDetails;
