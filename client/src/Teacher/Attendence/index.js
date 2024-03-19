import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Toast from "../../components/utlis/toast";

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [dates, setDates] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});

  const generateDatesForMonth = () => {
    const currentDate = new Date();
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
    console.log(studentId, date, status);
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
      console.log(data);
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
      //   console.log("Attendance data posted successfully:", response);
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
        `${process.env.REACT_APP_FETCH_URL}/getStudentsListByClassTeacherAttendence`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setStudents(data.students);
      setDates(generateDatesForMonth());
      setAttendanceData(data.attendanceData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
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
