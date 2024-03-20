import React, { useState, useEffect } from "react";
import Toast from "../../components/utlis/toast";

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
      }}
    >
      <div>
        <h2>Add Homework</h2>
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
        {studentsWithHomework.map((student, index) => (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
            key={student.student._id}
          >
            <h3>{student.student.fullName}</h3>
            {student.homework ? (
              <>
                <input
                  type="text"
                  value={homeworkData[index].title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={homeworkData[index].description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                  placeholder="Description"
                />
                <select
                  value={homeworkData[index].subject}
                  onChange={(e) =>
                    handleInputChange(index, "subject", e.target.value)
                  }
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
                  placeholder="Due Date"
                />
                <button
                  onClick={() => handleAddHomework(index)}
                  disabled={homeworkData[index].added}
                >
                  {homeworkData[index].added
                    ? "Homework Added"
                    : "Add Homework"}
                </button>
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
                />
                <input
                  type="text"
                  value={homeworkData[index].description}
                  onChange={(e) =>
                    handleInputChange(index, "description", e.target.value)
                  }
                  placeholder="Description"
                />
                <select
                  value={homeworkData[index].subject}
                  onChange={(e) =>
                    handleInputChange(index, "subject", e.target.value)
                  }
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
                  placeholder="Due Date"
                />
                <button
                  onClick={() => handleAddHomework(index)}
                  disabled={homeworkData[index].added}
                >
                  {homeworkData[index].added
                    ? "Homework Added"
                    : "Add Homework"}
                </button>
              </>
            )}
          </div>
        ))}
        <button onClick={handleAddHomeworkForAll}>
          Add Same Homework for All
        </button>
      </div>
    </div>
  );
};

export default HomeworkPage;
