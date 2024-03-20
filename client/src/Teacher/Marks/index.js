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

  const fetchStudentsWithMarks = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getStudentsWithMarks?year=${selectedYear}&month=${selectedMonth}&day=${selectedDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setStudentsWithMarks(data.studentsWithMarks);
      const initialMarksData = data.studentsWithMarks.map((student) => ({
        studentId: student.student._id,
        marksObtained: student.marks ? student.marks.marksObtained : "",
        totalMarks: student.marks ? student.marks.totalMarks : "",
        added: false, // Flag to track if marks are added
      }));

      setMarksData(initialMarksData);
    } catch (error) {
      console.error("Error fetching students with marks:", error);
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(currentDate.getDate()).padStart(2, "0");

    setSelectedDate(date);
    setSelectedMonth(month);
    setSelectedYear(String(year));
    fetchStudentsWithMarks();
  }, []);

  useEffect(() => {
    fetchStudentsWithMarks();
  }, [selectedYear, selectedMonth, selectedDate]);

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
      };

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

  const handleAddMarksForAll = async () => {
    try {
      const data = {
        marksObtained: marksData[0].marksObtained,
        totalMarks: marksData[0].totalMarks,
      };

      await Promise.all(
        studentsWithMarks.map(async (student) => {
          const response = await fetch(
            `${process.env.REACT_APP_FETCH_URL}/postMarks`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...data,
                studentId: student.student._id,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to add marks for ${student.student.fullName}`
            );
          }
        })
      );

      Toast.fire({
        icon: "success",
        title: "Marks added for all students",
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

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "20px",
      }}
    >
      <div>
        <h2>Add Marks</h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <select value={selectedDate} onChange={handleDateChange}>
            {[...Array(31).keys()].map((day) => (
              <option key={day + 1} value={String(day + 1).padStart(2, "0")}>
                {String(day + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
          <select value={selectedMonth} onChange={handleMonthChange}>
            {[...Array(12).keys()].map((month) => (
              <option
                key={month + 1}
                value={String(month + 1).padStart(2, "0")}
              >
                {String(month + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
          <select value={selectedYear} onChange={handleYearChange}>
            {[...Array(10).keys()].map((_, index) => {
              const year = new Date().getFullYear() + index;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
        {studentsWithMarks.map((student, index) => (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
            key={student.student._id}
          >
            <h3>{student.student.fullName}</h3>
            <input
              type="number"
              value={marksData[index].marksObtained}
              onChange={(e) =>
                handleInputChange(index, "marksObtained", e.target.value)
              }
              placeholder="Marks Obtained"
            />
            <input
              type="number"
              value={marksData[index].totalMarks}
              onChange={(e) =>
                handleInputChange(index, "totalMarks", e.target.value)
              }
              placeholder="Total Marks"
            />
            <button
              onClick={() => handleAddMarks(index)}
              disabled={marksData[index].added}
            >
              {marksData[index].added ? "Marks Added" : "Add Marks"}
            </button>
          </div>
        ))}
        <button onClick={handleAddMarksForAll}>Add Same Marks for All</button>
      </div>
    </div>
  );
};

export default MarksPage;
