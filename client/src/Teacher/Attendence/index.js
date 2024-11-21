import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Toast from "../../components/utlis/toast";
import "./index.css";

const AttendancePage = ({ setActive }) => {
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [selectedYear, setSelectedYear] = useState(2024);

  const generateDatesForMonth = (selectedMonth, selectedYear) => {
    const currentDate = selectedMonth
      ? new Date(selectedYear, selectedMonth - 1)
      : new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    const datesArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      datesArray.push(formattedDate);
    }
    return datesArray;
  };

  const postAttendanceData = async (studentId, date, status) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/postAttendanceData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            studentId: studentId,
            date: date,
            status: status,
          }),
        }
      );
      const data = await response.json();
      if (response.ok === true) {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        fetchAttendanceData();
      } else {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      console.error("Error posting attendance data:", error);
    }
  };

  const handleStatusChange = (studentId, date, status) => {
    postAttendanceData(studentId, date, status);
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getStudentsListByClassTeacherAttendence?month=${selectedMonth}&year=${selectedYear}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      const data = await response.json();
      setStudents(data.students);
      setDates(generateDatesForMonth(selectedMonth, selectedYear));
      setAttendanceData(data.attendanceData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedMonth, selectedYear]); // Fetch data when selected month or year changes

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleAddAttendance = () => {
    setActive("TodayAttendance");
  };

  console.log(dates, "dates");

  return (
    <div className="attendance-main-container">
      <h2 className="app-main-heading-2 text-center mt-5 mb-3">Attendance</h2>

      <div className="attendance-sub-container">
        <div className="attendane-select-monnth-year-container">
          <select
            onChange={handleMonthChange}
            value={selectedMonth}
            className="attendance-select-field"
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          <select
            onChange={handleYearChange}
            value={selectedYear}
            className="attendance-select-field"
          >
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
          </select>
        </div>
        <div className="d-flex">
          <button className="app-main-button-2" onClick={handleAddAttendance}>
            {" "}
            Add Attendance
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="attendance-header-text">Student</th>
                {dates.map((date) => (
                  <th key={date} className="text-center">
                    {date.substring(date.lastIndexOf("-") + 1)}
                  </th>
                ))}
                {/* <th className="attendance-header-text">{todaysDate}</th> */}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="attendance-value-text">{student.fullName}</td>
                  {dates.map((date) => (
                    <td key={date} className="attendance-value-text">
                      {/* <select
                        onChange={(e) =>
                          handleStatusChange(student._id, date, e.target.value)
                        }
                        value={attendanceData[student._id]?.[date] || ""}
                        className="attendance-present-absent-select"
                      >
                        <option value=""></option>
                        <option value="Present">P</option>
                        <option value="Absent">A</option>
                        <option value="Half Day">H</option>
                      </select> */}

                      <input
                        readOnly
                        value={
                          attendanceData[student._id]?.[date]
                            ? attendanceData[student._id]?.[date].split("")[0]
                            : ""
                        }
                        style={{ width: "30px" }}
                        className="attendance-present-absent-select"
                      />
                    </td>
                  ))}
                  {/* <td className="attendance-value-text">
                    <select
                      onChange={(e) =>
                        handleStatusChange(
                          student._id,
                          todaysDate,
                          e.target.value
                        )
                      }
                      value={attendanceData[student._id]?.[todaysDate] || ""}
                      className="attendance-present-absent-select"
                    >
                      <option value=""></option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Half Day">Half-day</option>
                    </select>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
