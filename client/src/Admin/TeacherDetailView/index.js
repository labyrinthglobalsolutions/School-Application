import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Select from "react-dropdown-select";
import Toast from "../../components/utlis/toast";

function EditTeacher({ teacherId }) {
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

  // Define options for subjects
  const subjectsOptions = [
    { value: "telugu", label: "Telugu" },
    { value: "hindi", label: "Hindi" },
    { value: "english", label: "English" },
    { value: "maths", label: "Maths" },
    { value: "science", label: "Science" },
    { value: "social", label: "Social" },
  ];

  // Define options for classes
  const classesOptions = [
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
  ];

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/getTeacherById/${teacherId}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch teacher details: ${response.status}`
          );
        }
        const data = await response.json();
        data.joinDate = new Date(data.joinDate).toISOString().split("T")[0];
        setTeacherData(data);

        // Initialize arrays to hold selected options
        const initialSelectedSubjects = [];
        const initialSelectedClasses = [];

        // Loop through all options
        data.subjects.forEach((subject) => {
          // Find the corresponding option in the options array
          const selectedOption = subjectsOptions.find(
            (option) => option.value === subject
          );
          if (selectedOption) {
            // If the option exists, add it to the array of selected options
            initialSelectedSubjects.push(selectedOption);
          }
        });

        data.classes.forEach((classValue) => {
          // Find the corresponding option in the options array
          const selectedOption = classesOptions.find(
            (option) => option.value === classValue
          );
          if (selectedOption) {
            // If the option exists, add it to the array of selected options
            initialSelectedClasses.push(selectedOption);
          }
        });

        // Set the selected options in the state
        setSelectedSubjects(initialSelectedSubjects);
        setSelectedClasses(initialSelectedClasses);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
        // Handle error (e.g., show error message)
      }
    };

    fetchTeacherDetails();
  }, [teacherId]);

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
      // Update teacherData with selected subjects and classes
      const updatedTeacherData = {
        ...teacherData,
        subjects: selectedSubjects.map((option) => option.value),
        classes: selectedClasses.map((option) => option.value),
      };

      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/updateTeacherById/${teacherId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTeacherData), // Send updatedTeacherData to backend
        }
      );
      console.log(response);
      const data = await response.json();
      if (response.ok === true) {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        // Show success message
      } else {
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
              <h2 className="teacher-add-heading">Edit Teacher</h2>
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
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid full name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <label htmlFor="validationCustom02" className="bootstraplabel">
                Joining Date
              </label>
              <Form.Control
                type="date"
                name="joinDate"
                value={teacherData.joinDate}
                onChange={change}
                placeholder="Enter Date of Birth"
                className="add-project-input"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid joining date.
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
                options={subjectsOptions}
                onChange={(selectedOptions) =>
                  setSelectedSubjects(selectedOptions)
                }
                values={selectedSubjects}
                multi
                required
              />
              <Form.Control.Feedback type="invalid">
                Please select valid subjects.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="validationCustom08" md="6">
              <Form.Label>Classes Taught</Form.Label>
              <Select
                name="classes"
                options={classesOptions}
                onChange={(selectedOptions) =>
                  setSelectedClasses(selectedOptions)
                }
                values={selectedClasses}
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
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default EditTeacher;
