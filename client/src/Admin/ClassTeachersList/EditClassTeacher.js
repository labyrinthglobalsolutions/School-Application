import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "./index.css";
import Toast from "../../components/utlis/toast";

function EditClassTeacher({ classTeacherId }) {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({
    classId: "",
    section: "",
    teacherId: "",
  });
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
  }, []);

  useEffect(() => {
    const fetchClassTeacherById = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/getClassTeacherById/${classTeacherId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch class teacher");
        }
        const classTeacherData = await response.json();
        setData({
          classId: classTeacherData.class,
          section: classTeacherData.section,
          teacherId: classTeacherData.teacherId,
        });
      } catch (error) {
        console.error("Error fetching class teacher:", error.message);
        Toast.fire({
          icon: "error",
          title: "Failed to fetch class teacher",
        });
      }
    };

    fetchClassTeacherById();
  }, [classTeacherId]);

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
        `${process.env.REACT_APP_FETCH_URL}/updateClassTeacherById/${classTeacherId}`,
        {
          method: "PUT",
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
        setValidated(false);
      }
      Toast.fire({
        icon: "success",
        title: "Class teacher updated successfully",
      });
    } catch (error) {
      console.error("Error updating class teacher:", error.message);
      Toast.fire({
        icon: "error",
        title: "Failed to update class teacher",
      });
    }
  };

  return (
    <div className="add-class-teacher-container">
      <h2>Edit Class Teacher</h2>
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
        <Form.Group controlId="section">
          <Form.Label>Section</Form.Label>
          <Form.Control
            as="select"
            name="section"
            value={data.section}
            onChange={handleChange}
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
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default EditClassTeacher;
