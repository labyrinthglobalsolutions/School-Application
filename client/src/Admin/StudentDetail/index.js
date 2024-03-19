import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./index.css";
import Toast from "../utlis/toast";

function StudentDetail({ updateEmpId }) {
  let id = updateEmpId;
  console.log(id, "id");
  const [validated, setValidated] = useState(false);
  const [profilePic, setprofilePic] = useState("");
  const [data, updatedData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    classID: "",
    address: "",
    phoneNumber: "",
    email: "",
    guardianName: "",
    guardianPhoneNumber: "",
    guardianEmail: "",
    profilePic: "",
    active: true,
    section: "",
    enrollmentDate: new Date().toISOString(),
  });

  const change = (event) => {
    updatedData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setprofilePic(file);
  };

  const getStudentDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getstudentdetailsbyid/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "response");
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const studentData = await response.json();
      // Update the data state with the fetched student details
      updatedData({
        fullName: studentData.fullName,
        dateOfBirth: studentData.dateOfBirth.split("T")[0],
        gender: studentData.gender,
        classID: studentData.classID,
        address: studentData.address,
        phoneNumber: studentData.phoneNumber,
        email: studentData.email,
        guardianName: studentData.guardianName,
        guardianPhoneNumber: studentData.guardianPhoneNumber,
        guardianEmail: studentData.guardianEmail,
        profilePic: studentData.profilePic,
        active: studentData.active,
        enrollmentDate: studentData.enrollmentDate.split("T")[0],
      });
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const token = sessionStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append the profilePic to FormData
    formData.append("profilePic", profilePic);
    console.log(formData, "formData");
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Use the FormData directly as the body
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/UpdateStudentById/${id}`,
        options
      );
      const data = await response.json();
      if (response.ok === true) {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        getStudentDetails();
      } else {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
        getStudentDetails();
      }
    } catch (error) {
      console.error("Error updating student details:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch roles or any other required data here
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    getStudentDetails();
  }, []);

  return (
    <div className="update-emp-totalContainer">
      <div className="update-emp-formContainer">
        <div className="update-emp-container">
          <div className="row">
            <div className="col-12">
              <h2 className="update-emp-heading">Update Student</h2>
            </div>
          </div>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <label
                htmlFor="validationCustom01"
                className="employee-add-label"
              >
                Full Name
              </label>
              <Form.Control
                required
                type="text"
                name="fullName"
                onChange={change}
                value={data.fullName}
                placeholder="Enter Your Full Name"
                className="employee-add-input"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <label
                htmlFor="validationCustom02"
                className="employee-add-label"
              >
                Date of Birth
              </label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth}
                onChange={change}
                placeholder="Enter Date of Birth"
                className="employee-add-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide date of birth
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <label
                htmlFor="validationCustom03"
                className="employee-add-label"
              >
                Gender
              </label>
              <Form.Select
                required
                name="gender"
                value={data.gender}
                onChange={change}
                className="employee-add-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select gender
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <label
                htmlFor="validationCustom04"
                className="employee-add-label"
              >
                Class
              </label>
              <Form.Control
                required
                as="select"
                value={data.classID}
                name="classID"
                onChange={change}
                className="employee-add-input"
              >
                <option value="">Select Class</option>
                <option value="nursery">Nursery</option>
                <option value="lkg">LKG</option>
                <option value="ukg">UKG</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Grade {index + 1}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a class
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="section">
              <Form.Label>Section</Form.Label>
              <Form.Control
                as="select"
                name="section"
                value={data.section}
                onChange={change}
                required
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please select a section.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <label
                htmlFor="validationCustom05"
                className="employee-add-label"
              >
                Address
              </label>
              <Form.Control
                required
                type="text"
                name="address"
                value={data.address}
                onChange={change}
                placeholder="Enter Your Address"
                className="employee-add-input"
              />
              <Form.Control.Feedback type="invalid">
                Please provide address
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <label
                htmlFor="validationCustom06"
                className="employee-add-label"
              >
                Phone Number
              </label>
              <Form.Control
                required
                type="text"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={change}
                placeholder="Enter your phone number"
                className="employee-add-input"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid number
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom07">
              <label
                htmlFor="validationCustom07"
                className="employee-add-label"
              >
                Email
              </label>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                onChange={change}
                placeholder="Enter Your E-Mail"
                className="employee-add-input"
              />
              {/* Email field is not marked as required */}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom08">
              <label
                htmlFor="validationCustom08"
                className="employee-add-label"
              >
                Guardian Name
              </label>
              <Form.Control
                required
                type="text"
                name="guardianName"
                value={data.guardianName}
                onChange={change}
                placeholder="Enter Guardian Name"
                className="employee-add-input"
              />
              <Form.Control.Feedback type="invalid">
                Please provide guardian name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom09">
              <label
                htmlFor="validationCustom09"
                className="employee-add-label"
              >
                Guardian Phone Number
              </label>
              <Form.Control
                required
                type="text"
                name="guardianPhoneNumber"
                value={data.guardianPhoneNumber}
                onChange={change}
                placeholder="Enter Guardian Phone Number"
                className="employee-add-input"
              />
              <Form.Control.Feedback type="invalid">
                Please provide guardian phone number
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom10">
              <label
                htmlFor="validationCustom10"
                className="employee-add-label"
              >
                Guardian Email
              </label>
              <Form.Control
                type="email"
                name="guardianEmail"
                value={data.guardianEmail}
                onChange={change}
                placeholder="Enter Guardian Email"
                className="employee-add-input"
              />
              {/* Guardian email field is not marked as required */}
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom11">
              <label
                htmlFor="validationCustom11"
                className="employee-add-label"
              >
                Profile Picture
              </label>
              <Form.Control
                type="file"
                name="profilePic"
                onChange={handleProfilePicChange}
                className="employee-add-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide profile picture
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="employee-add-button-container">
            <button type="submit" className="employee-add-button">
              UPDATE
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default StudentDetail;
