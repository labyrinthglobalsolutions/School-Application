import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./index.css";
import Toast from "../../components/utlis/toast";
import { DataArray } from "@mui/icons-material";

function AddClassTeacher() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    classId: "",
    section: "",
    teacherId: "",
  });
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/getteachers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch teachers");
        }
        const data = await response.json();
        setTeachers(data.teachers);
      } catch (error) {
        console.error("Error fetching teachers:", error.message);
        Toast.fire({
          icon: "error",
          title: "Failed to fetch teachers",
        });
      }
    };

    fetchTeachers();
    getClasses();
  }, []);

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
    } catch (error) {}
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const filteredSections = classes.filter(
    (el) => data.classId === el.className
  );

  console.log(filteredSections);

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
        `${process.env.REACT_APP_FETCH_URL}/addClassTeacher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        console.log(responseData);
        Toast.fire({
          icon: "error",
          title: responseData.message,
        });
        return;
      } else {
        setData({
          classId: "",
          section: "",
          teacherId: "",
        });
        setValidated(false);
      }
      Toast.fire({
        icon: "success",
        title: "Class teacher added successfully",
      });
    } catch (error) {
      console.error("Error adding class teacher:", error.message);
      Toast.fire({
        icon: "error",
        title: "Failed to add class teacher",
      });
    }
  };

  return (
    <div className="teacher-add-totalContainer">
      <h2>Add Class Teacher</h2>
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
              <option value={el.className}>{el.className}</option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a class.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="section">
          <Form.Label>Section</Form.Label>
          <Form.Control
            as="select"
            name="section"
            value={data.section}
            onChange={handleChange}
            required
          >
            {data.classId === "" && (
              <option value="">Please select a class first</option>
            )}
            {filteredSections.length > 0 ? (
              filteredSections.map((el) => (
                <option key={el._id} value={el.sectionName}>
                  {el.sectionName}
                </option>
              ))
            ) : (
              <option value="">No sections available</option>
            )}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a section.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="teacherId">
          <Form.Label>Teacher ID</Form.Label>
          <Form.Control
            as="select"
            name="teacherId"
            value={data.teacherId}
            onChange={handleChange}
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullName}
              </option>
            ))}
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select a teacher.
          </Form.Control.Feedback>
        </Form.Group>
        <button type="submit" className="global-add-button">
          Submit
        </button>
      </Form>
    </div>
  );
}

export default AddClassTeacher;
