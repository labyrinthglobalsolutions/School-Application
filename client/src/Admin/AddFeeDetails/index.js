import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./index.css";
import Toast from "../../components/utlis/toast";

function AddFeeDetails() {
  const [validated, setValidated] = useState(false);
  const [classes, setClasses] = useState([]);
  const [data, setData] = useState({
    classId: "",
    tuitionFee: "",
    examFee: "",
    transportationFee: "",
    booksFee: "",
    uniformFee: "",
    otherFees: "",
  });

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
        `${process.env.REACT_APP_FETCH_URL}/addFeeDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add fee details");
      }

      setData({
        classId: "",
        tuitionFee: "",
        examFee: "",
        transportationFee: "",
        booksFee: "",
        uniformFee: "",
        otherFees: "",
      });
      setValidated(false);

      Toast.fire({
        icon: "success",
        title: "Fee details added successfully",
      });
    } catch (error) {
      console.error("Error adding fee details:", error.message);
      Toast.fire({
        icon: "error",
        title: "Failed to add fee details",
      });
    }
  };

  const getClasses = async () => {
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getClasses`,
        options
      );
      const data = await response.json();
      setClasses(data.classes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div className="teacher-add-totalContainer">
      <h2>Add Fee Details</h2>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="teacher-add-formContainer"
      >
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
            {classes.map((el) => (
              <option key={el._id} value={el.className}>
                {el.className}
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
        <div className="teacher-add-button-container">
          <button type="submit" className="teacher-add-button">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AddFeeDetails;
