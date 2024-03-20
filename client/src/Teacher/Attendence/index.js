import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Toast from "../../components/utlis/toast";

const AttendancePage = () => {
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

  return (
    <div>
      <h2>Attendance</h2>
      <div className="row">
        <div className="col-md-6">
          {/* Month select dropdown */}
          <select onChange={handleMonthChange} value={selectedMonth}>
            <option value="">Select Month</option>
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
          {/* Year select dropdown */}
          <select onChange={handleYearChange} value={selectedYear}>
            <option value="">Select Year</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            {/* Add more years as needed */}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student</th>
                {dates.map((date) => (
                  <th key={date}>
                    {date.substring(date.lastIndexOf("-") + 1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.fullName}</td>
                  {dates.map((date) => (
                    <td key={date}>
                      <select
                        onChange={(e) =>
                          handleStatusChange(student._id, date, e.target.value)
                        }
                        value={attendanceData[student._id]?.[date] || ""}
                      >
                        <option value=""></option>
                        <option value="Present">P</option>
                        <option value="Absent">A</option>
                        <option value="Half Day">H</option>
                      </select>
                    </td>
                  ))}
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
