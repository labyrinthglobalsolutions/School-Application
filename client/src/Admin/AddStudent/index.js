import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "./index.css";
import Toast from "../../components/utlis/toast";
import Select from "react-dropdown-select";

function AddStudent() {
  const [validated, setValidated] = useState(false);
  const [profilePic, setprofilePic] = useState("");

  const [data, setData] = useState({
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

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setprofilePic(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch students or employees data here
    };
    fetchData();
  }, []);

  const change = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
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
        title: "Please fill the required fields",
      });
      return;
    }
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const token = sessionStorage.getItem("token");

    // Append the profilePic to FormData
    formData.append("profilePic", profilePic);
    console.log(formData, "formData");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/addstudent`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: responseData.message,
        });
      }

      // setData({
      //   fullName: "",
      //   dateOfBirth: "",
      //   gender: "",
      //   classID: "",
      //   address: "",
      //   phoneNumber: "",
      //   email: "",
      //   guardianName: "",
      //   guardianPhoneNumber: "",
      //   guardianEmail: "",
      //   profilePic: "",
      //   active: true,
      //   section: "",
      //   enrollmentDate: new Date().toISOString(),
      // });
      setValidated(false);

      Toast.fire({
        icon: "success",
        title: responseData.message,
      });
    } catch (error) {
      console.error("Error adding student:", error.message);
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
  };

  return (
    <div className="add-project-totalContainer">
      <div className="add-project-formContainer">
        <h2 className="add-project-heading">Add Student</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <label htmlFor="validationCustom01" className="bootstraplabel">
                Full Name
              </label>
              <Form.Control
                required
                value={data.fullName}
                onChange={change}
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                className="add-project-input"
              />
              <Form.Control.Feedback type="invalid">
                {validated && !data.fullName && "Please provide full name"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <label htmlFor="validationCustom02" className="bootstraplabel">
                Date of Birth
              </label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth}
                onChange={change}
                placeholder="Enter Date of Birth"
                className="add-project-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                {validated &&
                  !data.dateOfBirth &&
                  "Please provide date of birth"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom03">
              <label htmlFor="validationCustom03" className="bootstraplabel">
                Gender
              </label>
              <Form.Select
                required
                name="gender"
                value={data.gender}
                onChange={change}
                className="add-project-input"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {validated && !data.gender && "Please select gender"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label className="bootstraplabel">Class</Form.Label>
              <Form.Control
                required
                as="select"
                value={data.classID}
                name="classID"
                onChange={change}
                className="add-project-input"
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
                {validated && !data.classID && "Please select a class"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="section" md="3">
              <Form.Label className="bootstraplabel mb-0">Section</Form.Label>
              <Form.Control
                as="select"
                name="section"
                value={data.section}
                onChange={change}
                required
                className="add-project-input"
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
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <label htmlFor="validationCustom05" className="bootstraplabel">
                Address
              </label>
              <Form.Control
                required
                type="text"
                name="address"
                value={data.address}
                onChange={change}
                placeholder="Enter Address"
                className="add-project-input"
              />
              <Form.Control.Feedback type="invalid">
                {validated && !data.address && "Please provide address"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom06">
              <label htmlFor="validationCustom06" className="bootstraplabel">
                Phone Number
              </label>
              <Form.Control
                required
                type="text"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={change}
                placeholder="Enter Phone Number"
                className="add-project-input"
              />
              <Form.Control.Feedback type="invalid">
                {validated &&
                  !data.phoneNumber &&
                  "Please provide phone number"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom07">
              <label htmlFor="validationCustom07" className="bootstraplabel">
                Email
              </label>
              <Form.Control
                type="email"
                name="email"
                value={data.email}
                onChange={change}
                placeholder="Enter Email"
                className="add-project-input"
              />
              {/* Email field is not marked as required */}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="3" controlId="validationCustom08">
              <label htmlFor="validationCustom08" className="bootstraplabel">
                Guardian Name
              </label>
              <Form.Control
                required
                type="text"
                name="guardianName"
                value={data.guardianName}
                onChange={change}
                placeholder="Enter Guardian Name"
                className="add-project-input"
              />
              <Form.Control.Feedback type="invalid">
                {validated &&
                  !data.guardianName &&
                  "Please provide guardian name"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom09">
              <label htmlFor="validationCustom09" className="bootstraplabel">
                Guardian Phone Number
              </label>
              <Form.Control
                required
                type="text"
                name="guardianPhoneNumber"
                value={data.guardianPhoneNumber}
                onChange={change}
                placeholder="Enter Guardian Phone Number"
                className="add-project-input"
              />
              <Form.Control.Feedback type="invalid">
                {validated &&
                  !data.guardianPhoneNumber &&
                  "Please provide guardian phone number"}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom10">
              <label htmlFor="validationCustom10" className="bootstraplabel">
                Guardian Email
              </label>
              <Form.Control
                type="email"
                name="guardianEmail"
                value={data.guardianEmail}
                onChange={change}
                placeholder="Enter Guardian Email"
                className="add-project-input"
              />
              {/* Guardian email field is not marked as required */}
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom11">
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
          <div className="text-center">
            <button type="submit" className="add-project-button">
              CREATE
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddStudent;
