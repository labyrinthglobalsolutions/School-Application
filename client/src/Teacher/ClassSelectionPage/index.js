import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ClassSelectionPage = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        };
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/getClassesByTeacherId`,
          options
        );
        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const navigate = useNavigate();
  const changeRoute = (id) => {
    navigate(`/TeacherPanel/${id}`);
  };

  return (
    <div>
      <h2>Classes List</h2>
      <div className="card-container">
        {classes.map((classInfo, index) => (
          <Card key={index} className="class-card">
            <Card.Body
              onClick={() => {
                changeRoute(classInfo._id);
              }}
            >
              <Card.Title>{classInfo.classId}</Card.Title>
              <Card.Text>{classInfo.section}</Card.Text>
              <Card.Text>{classInfo.subject}</Card.Text>
              {/* You can add more information about the class here */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClassSelectionPage;
