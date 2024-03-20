import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Select from "react-dropdown-select";
import Toast from "../../components/utlis/toast";
import "./index.css";

function AddTeacher() {
  const [validated, setValidated] = useState(false);
  const [teacherData, setTeacherData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    joinDate: "",
    subjects: [],
    classes: [],
  });

  const change = (event) => {
    setTeacherData({
      ...teacherData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit called");
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/addteacher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(teacherData),
        }
      );
      console.log(response);
      const data = await response.json();
      if (response.ok === true) {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        setTeacherData({
          fullName: "",
          email: "",
          password: "",
          phoneNumber: "",
          address: "",
          joinDate: "",
          subjects: [],
          classes: [],
        });
        setValidated(false);
        // Show success message
      } else {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
        // Show error message
      }
    } catch (error) {
      // Show error message
    }
  };

  return (
    <div className="teacher-add-totalContainer">
      <div className="teacher-add-formContainer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="teacher-add-heading">Create Teacher</h2>
            </div>
          </div>
        </div>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group as={Col} controlId="validationCustom01" md="6">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={teacherData.fullName}
                onChange={change}
                required
                className="teacher-add-input"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid full name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                name="joinDate"
                value={teacherData.joinDate}
                onChange={change}
                placeholder="Enter Date of Birth"
                className="teacher-add-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                {validated &&
                  !teacherData.dateOfBirth &&
                  "Please provide date of birth"}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="validationCustom03" md="6">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={teacherData.email}
                onChange={change}
                className="teacher-add-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom04" md="6">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={teacherData.password}
                onChange={change}
                className="teacher-add-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="validationCustom05" md="6">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={teacherData.phoneNumber}
                onChange={change}
                className="teacher-add-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid phone number.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom06" md="6">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={teacherData.address}
                onChange={change}
                className="teacher-add-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="validationCustom07" md="6">
              <Form.Label>Subjects</Form.Label>
              <Select
                name="subjects"
                options={[
                  { value: "telugu", label: "Telugu" },
                  { value: "hindi", label: "Hindi" },
                  { value: "english", label: "English" },
                  { value: "maths", label: "Maths" },
                  { value: "science", label: "Science" },
                  { value: "social", label: "Social" },
                ]}
                onChange={(selectedOptions) =>
                  setTeacherData({
                    ...teacherData,
                    subjects: selectedOptions.map((option) => option.value),
                  })
                }
                multi
                className="teacher-add-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please select valid subjects.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom08" md="6">
              <Form.Label>Classes Taught</Form.Label>
              <Select
                className="teacher-add-input"
                name="classes"
                options={[
                  { value: "nursery", label: "Nursery" },
                  { value: "lkg", label: "LKG" },
                  { value: "ukg", label: "UKG" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                  { value: "7", label: "7" },
                  { value: "8", label: "8" },
                  { value: "9", label: "9" },
                  { value: "10", label: "10" },
                ]}
                onChange={(selectedOptions) =>
                  setTeacherData({
                    ...teacherData,
                    classes: selectedOptions.map((option) => option.value),
                  })
                }
                multi
                required
              />
              <Form.Control.Feedback type="invalid">
                Please select valid classes.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <div className="teacher-add-button-container">
            <button type="submit" className="teacher-add-button">
              Create
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddTeacher;
