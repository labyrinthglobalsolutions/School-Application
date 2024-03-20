import React, { useState, useEffect } from "react";
import Toast from "../../components/utlis/toast";

const MarksPage = () => {
  const [studentsWithMarks, setStudentsWithMarks] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    String(new Date().getDate()).padStart(2, "0")
  );
  const [selectedMonth, setSelectedMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [examType, setExamType] = useState("Midterm"); // Default exam type

  const fetchStudentsWithMarks = async () => {
    try {
      // Fetch studentsWithMarks from backend
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getStudentsWithMarks`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setStudentsWithMarks(data.studentsWithMarks);

      // Initialize marksData with the same length as studentsWithMarks
      const initialMarksData = data.studentsWithMarks.map(() => ({
        marksObtained: "",
        totalMarks: "",
        added: false,
      }));
      setMarksData(initialMarksData);
    } catch (error) {
      console.error("Error fetching students with marks:", error);
    }
  };

  useEffect(() => {
    // Fetch students with marks and initialize marksData

    fetchStudentsWithMarks();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedMarksData = [...marksData];
    updatedMarksData[index][field] = value;
    setMarksData(updatedMarksData);
  };

  const handleAddMarks = async (index) => {
    try {
      const studentId = studentsWithMarks[index].student._id;
      const data = {
        studentId: studentId,
        marksObtained: marksData[index].marksObtained,
        totalMarks: marksData[index].totalMarks,
        examType: examType, // Include examType in the data
      };

      // Send data to backend to add marks
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/postMarks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add marks");
      }

      const responseData = await response.json();
      Toast.fire({
        icon: "success",
        title: responseData.message,
      });
      fetchStudentsWithMarks();
    } catch (error) {
      console.error("Error adding marks:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to add marks",
      });
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "20px",
        padding: "20px",
      }}
    >
      <div>
        <h2 style={{ marginBottom: "20px" }}>Add Marks</h2>
        <select
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          style={{ marginBottom: "20px" }}
        >
          <option value="Midterm">Midterm</option>
          <option value="Final">Final</option>
          <option value="Quiz">Quiz</option>
          {/* Add more options as needed */}
        </select>
        {studentsWithMarks.map((student, index) => (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
            key={student._id}
          >
            <h3 style={{ width: "250px", marginRight: "10px" }}>
              {student.fullName}
            </h3>
            <input
              type="number"
              value={marksData[index]?.marksObtained || ""}
              onChange={(e) =>
                handleInputChange(index, "marksObtained", e.target.value)
              }
              placeholder="Marks Obtained"
              style={{ marginRight: "10px" }}
            />
            <input
              type="number"
              value={marksData[index]?.totalMarks || ""}
              onChange={(e) =>
                handleInputChange(index, "totalMarks", e.target.value)
              }
              placeholder="Total Marks"
              style={{ marginRight: "10px" }}
            />
            <button
              onClick={() => handleAddMarks(index)}
              disabled={marksData[index]?.added}
              style={{
                padding: "5px 10px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {marksData[index]?.added ? "Marks Added" : "Add Marks"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarksPage;
