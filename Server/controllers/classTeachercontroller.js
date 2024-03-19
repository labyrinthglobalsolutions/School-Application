import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CatchAsyncError from "../middleware/catchAsyncError.js";
import ClassTeacher from "../models/classTeacher.js";
import Student from "../models/studentModel.js";
import Attendance from "../models/attendenceModel.js";

export const classTeacherLogin = CatchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const classTeacher = await ClassTeacher.findOne({
    email: email.toLowerCase(),
  });
  if (!classTeacher) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isPasswordValid = await bcrypt.compare(password, classTeacher.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { email: classTeacher.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "72h",
    }
  );
  res.status(200).json({ token });
});

// export const getStudentsListByClassTeacherAttendence = CatchAsyncError(
//   async (req, res) => {
//     try {
//       const students = await Student.find({}); // Fetch only name and rollNumber fields
//       console.log(students, "students");
//       res.json(students);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }
// );

export const getStudentsListByClassTeacherAttendence = CatchAsyncError(
  async (req, res) => {
    try {
      const students = await Student.find({}, "fullName rollNumber");
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const firstDayOfMonth = new Date(year, month - 1, 1);
      const lastDayOfMonth = new Date(year, month, 0);
      const attendanceData = await Attendance.find({
        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      }).populate("studentId", "fullName"); // Assuming the studentId field in Attendance model references the Student model
      const formattedAttendanceData = {};
      attendanceData.forEach((attendance) => {
        const studentId = attendance.studentId._id;
        const date = attendance.date.toISOString().split("T")[0]; // Get the date in 'YYYY-MM-DD' format
        formattedAttendanceData[studentId] =
          formattedAttendanceData[studentId] || {};
        formattedAttendanceData[studentId][date] = attendance.status;
      });
      res.json({ students, attendanceData: formattedAttendanceData });
    } catch (error) {
      console.error("Error fetching students and attendance data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export const postAttendanceData = CatchAsyncError(async (req, res) => {
  const { studentId, date, status } = req.body;

  console.log(studentId, date, status);

  try {
    // Update or create attendance record in the database
    await Attendance.updateOne(
      { studentId, date },
      { status },
      { upsert: true }
    );

    res.status(200).json({ message: "Attendance data updated successfully" });
  } catch (error) {
    console.error("Error updating attendance data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
