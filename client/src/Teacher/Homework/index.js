import React, { useState, useEffect } from "react";
import Toast from "../../components/utlis/toast";
import './index.css'

const HomeworkPage = () => {
  const [studentsWithHomework, setStudentsWithHomework] = useState([]);
  const [homeworkData, setHomeworkData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    String(new Date().getDate()).padStart(2, "0")
  );
  const [selectedMonth, setSelectedMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, "0")
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchStudentsWithHomework = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getStudentsWithHomework?year=${selectedYear}&month=${selectedMonth}&day=${selectedDate}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setStudentsWithHomework(data.studentsWithHomework);
      const initialHomeworkData = data.studentsWithHomework.map((student) => ({
        studentId: student.student._id,
        title: student.homework ? student.homework.title : "",
        description: student.homework ? student.homework.description : "",
        subject: student.homework ? student.homework.subject : "",
        dueDate: student.homework ? student.homework.dueDate : "",
        added: false, // Flag to track if homework is added
      }));

      setHomeworkData(initialHomeworkData);
    } catch (error) {
      console.error("Error fetching students with homework:", error);
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
    fetchStudentsWithHomework();
  }, []);

  useEffect(() => {
    fetchStudentsWithHomework();
  }, [selectedYear, selectedMonth, selectedDate]);

  const handleInputChange = (index, field, value) => {
    const updatedHomeworkData = [...homeworkData];
    updatedHomeworkData[index][field] = value;
    setHomeworkData(updatedHomeworkData);
  };

  const handleAddHomework = async (index) => {
    try {
      const studentId = studentsWithHomework[index].student._id;
      const data = {
        studentId: studentId,
        title: homeworkData[index].title,
        description: homeworkData[index].description,
        subject: homeworkData[index].subject,
        dueDate: homeworkData[index].dueDate,
      };

      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/postHomework`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add homework");
      }

      const responseData = await response.json();
      Toast.fire({
        icon: "success",
        title: responseData.message,
      });
      fetchStudentsWithHomework();
    } catch (error) {
      console.error("Error adding homework:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to add homework",
      });
    }
  };

  const handleAddHomeworkForAll = async () => {
    try {
      const data = {
        title: homeworkData[0].title,
        description: homeworkData[0].description,
        subject: homeworkData[0].subject,
        dueDate: homeworkData[0].dueDate,
      };

      await Promise.all(
        studentsWithHomework.map(async (student) => {
          const response = await fetch(
            `${process.env.REACT_APP_FETCH_URL}/postHomework`,
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
              `Failed to add homework for ${student.student.fullName}`
            );
          }
        })
      );

      Toast.fire({
        icon: "success",
        title: "Homework added for all students",
      });
      fetchStudentsWithHomework();
    } catch (error) {
      console.error("Error adding homework:", error);
      Toast.fire({
        icon: "error",
        title: "Failed to add homework",
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
        padding: "20px",
      }}
    >
      <div style={{ width: "100%", overflow: "scroll" }}>
        <h2 className="app-main-heading-2 text-center mb-4">Add Homework</h2>
        <div className="attendance-sub-container">
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <select
              value={selectedDate}
              onChange={handleDateChange}
              className="date-select-option"
            >
              {[...Array(31).keys()].map((day) => (
                <option key={day + 1} value={String(day + 1).padStart(2, "0")}>
                  {String(day + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="date-select-option"
            >
              {[...Array(12).keys()].map((month) => (
                <option
                  key={month + 1}
                  value={String(month + 1).padStart(2, "0")}
                >
                  {String(month + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="date-select-option"
            >
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
          <div>
            <button
              className="app-main-button-2"
              onClick={handleAddHomeworkForAll}
            >
              Add Same Homework for All
            </button>
          </div>
        </div>
        <div className="marks-add-list-container">
          {studentsWithHomework.map((student, index) => (
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                border: "1px solid #ddddee",
                padding: "10px",
                borderRadius: "4px",
                margin: "10px 0px",
                width: "100%",
                overflow: "scroll",
              }}
              key={student.student._id}
            >
              <h3
                style={{ minWidth: "250px", marginRight: "10px" }}
                className="app-main-heading-4"
              >
                {index + 1}. {student.student.fullName}
              </h3>
              {student.homework ? (
                <>
                  <input
                    type="text"
                    value={homeworkData[index].title}
                    onChange={(e) =>
                      handleInputChange(index, "title", e.target.value)
                    }
                    placeholder="Title"
                    className="title-input-field"
                  />
                  <input
                    type="text"
                    value={homeworkData[index].description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="title-input-field"
                  />
                  <select
                    value={homeworkData[index].subject}
                    onChange={(e) =>
                      handleInputChange(index, "subject", e.target.value)
                    }
                    className="date-select-option"
                  >
                    <option value="">Select Subject</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Maths">Maths</option>
                    <option value="Social">Social</option>
                    <option value="Science">Science</option>
                  </select>
                  <input
                    type="date"
                    value={homeworkData[index].dueDate}
                    onChange={(e) =>
                      handleInputChange(index, "dueDate", e.target.value)
                    }
                    className="title-input-field"
                    style={{ minWidth: "100px" }}
                  />
                  <div>
                    <button
                      style={{
                        padding: "5px 10px",
                        border: "none",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                      onClick={() => handleAddHomework(index)}
                      disabled={homeworkData[index].added}
                      className="app-main-button-2"
                    >
                      {homeworkData[index].added
                        ? "Homework Added"
                        : "Add Homework"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={homeworkData[index].title}
                    onChange={(e) =>
                      handleInputChange(index, "title", e.target.value)
                    }
                    placeholder="Title"
                    className="title-input-field"
                  />
                  <input
                    type="text"
                    value={homeworkData[index].description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    className="title-input-field"
                  />
                  <select
                    value={homeworkData[index].subject}
                    onChange={(e) =>
                      handleInputChange(index, "subject", e.target.value)
                    }
                    className="date-select-option"
                  >
                    <option value="">Select Subject</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Maths">Maths</option>
                    <option value="Social">Social</option>
                    <option value="Science">Science</option>
                  </select>
                  <input
                    type="date"
                    value={homeworkData[index].dueDate}
                    onChange={(e) =>
                      handleInputChange(index, "dueDate", e.target.value)
                    }
                    className="title-input-field"
                    style={{ minWidth: "100px" }}
                  />
                  <div>
                    <button
                      style={{
                        width: "max-content",
                      }}
                      onClick={() => handleAddHomework(index)}
                      disabled={homeworkData[index].added}
                      className="app-main-button-2"
                    >
                      {homeworkData[index].added
                        ? "Homework Added"
                        : "Add Homework"}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeworkPage;
