import React, { useState, useEffect } from "react";
import Toast from "../../components/utlis/toast";
import "./index.css";
const MessagePage = () => {
  const [students, setStudents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [teacherId, setTeacherId] = useState();

  useEffect(() => {
    fetchStudents();
    fetchTeacherId();
  }, []);

  const fetchTeacherId = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getTeacherId`
      );
      const data = await response.json();
      setTeacherId(data.teacherId);
    } catch (error) {
      console.error("Error fetching teacher ID:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/messagesStudentlist`
      );
      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchMessagesByStudent = async (studentId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getAllMessagesByTeacher/${studentId}`
      );
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!selectedStudent || !message.trim()) return;

      const senderId = teacherId;
      const receiverId = selectedStudent;

      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/sendMessageByTeacher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId,
            receiverId,
            message,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
        return;
      }
      Toast.fire({
        icon: "success",
        title: data.message,
      });

      // Reset message input and selected student
      setMessage("");

      // Optionally, you can fetch students again to update the list
      fetchMessagesByStudent(selectedStudent);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const onChangeStudent = (e) => {
    const studentId = e.target.value;
    setSelectedStudent(studentId);
    fetchMessagesByStudent(studentId);
  };

  return (
    <div>
      <h2>Student List</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h3>Send Message</h3>
          <select onChange={onChangeStudent}>
            <option key="" value="">
              Select Student
            </option>
            {students.map((student) => {
              return (
                <option key={student._id} value={student._id}>
                  {student.fullName}
                </option>
              );
            })}
          </select>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      </div>
      <div>
        <h2>Messages</h2>
        <ul className="message-list">
          {messages.map((message) => {
            console.log(message.senderId === teacherId);
            return (
              <li
                key={message._id}
                className={`message-item ${
                  message.senderId === teacherId
                    ? "message-item-right"
                    : "message-item-left"
                }`}
              >
                {message.message}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MessagePage;
