import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const Timetable = ({ changeSetActive }) => {
  const [timetableData, setTimetableData] = useState([]);

  useEffect(() => {
    const fetchTimetableData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/gettimetable`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch timetable data");
        }
        const data = await response.json();
        setTimetableData(data); // Assuming data is an array of timetable objects
      } catch (error) {
        console.error("Error fetching timetable data:", error);
      }
    };

    fetchTimetableData();
  }, []);

  // Function to group timetable data by class and section
  const groupTimetableData = () => {
    const groupedData = {};
    timetableData.forEach((entry) => {
      const { classId, section } = entry;
      const key = `${classId}-${section}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(entry);
    });
    return groupedData;
  };

  // Function to pivot timetable data for each class
  const pivotTimetableData = (classData) => {
    const periods = [
      "Period 1",
      "Period 2",
      "Period 3",
      "Period 4",
      "Period 5",
      "Period 6",
      "Period 7",
      "Period 8",
    ];

    // Create an array of objects, each representing a period with teacher and subject
    const pivotedData = periods.map((period) => {
      // Find the entry in classData for the current period
      const periodEntry = classData.find((entry) => entry.period === period);

      // Return an object with period, teacher, and subject information
      return {
        period,
        teacher: periodEntry ? periodEntry.fullName : "",
        subject: periodEntry ? periodEntry.subject : "",
      };
    });

    return pivotedData;
  };

  const addTimeTable = () => {
    changeSetActive("AddTimeTable");
  };

  return (
    <div>
      <button onClick={addTimeTable}>Add  or Edit  Timetable</button>
      {Object.entries(groupTimetableData()).map(([groupKey, groupData]) => (
        <div key={groupKey}>
          <h3>{`Class ${groupData[0].classId} Section ${groupData[0].section}`}</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Period</th>
                {pivotTimetableData(groupData).map((entry) => (
                  <th key={entry.period}>{entry.period}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Teacher</td>
                {pivotTimetableData(groupData).map((entry) => (
                  <td key={entry.period}>{entry.teacher}</td>
                ))}
              </tr>
              <tr>
                <td>Subject</td>
                {pivotTimetableData(groupData).map((entry) => (
                  <td key={entry.period}>{entry.subject}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default Timetable;
