import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Toast from "../../components/utlis/toast";

const TimetableForm = () => {
  const [classId, setClassId] = useState("");
  const [period, setPeriod] = useState("");
  const [subject, setSubject] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [section, setSection] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  // Fetch the list of teachers when the component mounts
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
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
    getClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      classId,
      period: period.toString(),
      subject: subject.toString(),
      teacherId,
      section,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/addtimetable`,
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
        Toast.fire({
          icon: "error",
          title: responseData.message,
        });
        return;
      }
      Toast.fire({
        icon: "success",
        title: responseData.message,
      });
      // Add further logic if needed
    } catch (error) {
      console.error("Error creating timetable:", error);
      // Handle error
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

  const filteredSections = classes.filter((el) => classId === el.className);

  return (
    <div className="teacher-add-totalContainer">
      <h2>Create or Update Timetable</h2>
      <Form onSubmit={handleSubmit} className="teacher-add-formContainer">
        <Form.Group controlId="classId">
          <Form.Label>Class</Form.Label>
          <Form.Control
            as="select"
            name="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
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
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          >
            {classId === "" && (
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
        <Form.Group controlId="period">
          <Form.Label>Period</Form.Label>
          <Form.Control
            as="select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="">Select Period</option>
            {[...Array(8)].map((_, index) => (
              <option key={index + 1} value={`Period ${index + 1}`}>
                Period {index + 1}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            as="select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="Telugu">Telugu</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Maths">Maths</option>
            <option value="Social">Social</option>
            <option value="Science">Science</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="teacherId">
          <Form.Label>Teacher</Form.Label>
          <Form.Control
            as="select"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.fullName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <button className="global-add-button" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default TimetableForm;
